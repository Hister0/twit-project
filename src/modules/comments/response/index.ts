import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentResponse{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  post_id: number
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number
}