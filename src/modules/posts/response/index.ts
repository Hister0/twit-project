import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostResponse{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number
}