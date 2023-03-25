import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string
}

export class UpdatePostDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string
}