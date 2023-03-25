import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../users/dto";
import { UserLoginDTO } from "./dto";
import { AuthUserResponse } from "./response";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponse } from "../users/response";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Authentication')
  @ApiResponse({status: 201, type: UserResponse})
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<UserResponse> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('Authentication')
  @ApiResponse({status: 200, type: AuthUserResponse})
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUsers(dto);
  }
}
