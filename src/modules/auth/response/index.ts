import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthUserResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string
  @ApiProperty()
  @IsString()
  token: string
}