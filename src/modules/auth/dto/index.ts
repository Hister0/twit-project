import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}