import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
