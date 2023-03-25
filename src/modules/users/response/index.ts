import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserResponse{
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
  email: string
}