import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDTO, UpdatePostDTO } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostResponse } from "./response";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiTags('Posts')
  @ApiResponse({status: 200, type: [PostResponse]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @ApiTags('Posts')
  @ApiResponse({status: 200, type: [PostResponse]})
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserPosts(@Query('id') id: string) {
    return this.postsService.getUserPosts(+id);
  }

  @ApiTags('Posts')
  @ApiResponse({status: 200, type: PostResponse})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPost(@Param('id') id: string): Promise<PostResponse> {
    return this.postsService.getPost(+id);
  }

  @ApiTags('Posts')
  @ApiResponse({status: 201, type: PostResponse})
  @UseGuards(JwtAuthGuard)
  @Post('createPost')
  createPost(@Body() dto: CreatePostDTO, @Req() request): Promise<PostResponse> {
    const user = request.user
    return this.postsService.createPost(user.id, dto);
  }

  @ApiTags('Posts')
  @ApiResponse({status: 200, type: PostResponse})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updatePost(@Query('id') id: string,
             @Body() dto: UpdatePostDTO, @Req() request): Promise<PostResponse> {
    const user = request.user;
    return this.postsService.updatePost(+id, user.id,dto);
  }

  @ApiTags('Posts')
  @ApiResponse({status: 200, type: PostResponse})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deletePost(@Query('id') id: string, @Req() request): Promise<PostResponse> {
    const user = request.user;
    return this.postsService.deletePost(+id, user.id);
  }
}
