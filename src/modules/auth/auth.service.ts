import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDTO } from "../users/dto";
import { UserLoginDTO } from "./dto";
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from "./response";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  async registerUsers (dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existEmail = await this.userService.findExistUser(dto.email, 'email');
    const existNickname = await this.userService.findExistUser(dto.nickname, 'nickname');
    if (existEmail[0] || existNickname[0]) throw new BadRequestException('User already exist');
    return this.userService.createUser(dto);
  }

  async loginUsers (dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findExistUser(dto.email, 'email');
    if (!existUser[0]) throw new BadRequestException('User not exist');
    const validatePassword = await bcrypt.compare(dto.password, existUser[0].password);
    if (!validatePassword) throw new BadRequestException('Wrong data');
    const userData = {
      nickname: existUser[0].nickname,
      email: existUser[0].email
    }
    const token = await this.tokenService.generateJwtToken(userData);
    delete existUser[0].password;
    return {...existUser[0], token};
  }
}
