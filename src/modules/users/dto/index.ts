import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  nickname: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
