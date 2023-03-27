import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { CommentResponse } from "./response";
import { CreateCommentDTO } from "./dto";

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiTags('Comments')
  @ApiResponse({status: 200, type: [CommentResponse]})
  @UseGuards(JwtAuthGuard)
  @Get('post')
  getPostComments(@Query('id') post_id: string) {
    return this.commentsService.getPostComments(+post_id);
  }

  @ApiTags('Comments')
  @ApiResponse({status: 200, type: [CommentResponse]})
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserComments(@Query('id') user_id: string) {
    return this.commentsService.getUserComments(+user_id);
  }

  @ApiTags('Comments')
  @ApiResponse({status: 200, type: CommentResponse})
  @UseGuards(JwtAuthGuard)
  @Get()
  getComment(@Query('id') comment_id: string): Promise<CommentResponse> {
    return this.commentsService.getComment(+comment_id);
  }

  @ApiTags('Comments')
  @ApiResponse({status: 201, type: CommentResponse})
  @UseGuards(JwtAuthGuard)
  @Post('createComment')
  createComment(@Query('id') post_id,
                @Body() dto: CreateCommentDTO,
                @Req() request): Promise<CommentResponse> {
    const user = request.user;
    return this.commentsService.createComment(post_id, user.id, dto);
  }

  @ApiTags('Comments')
  @ApiResponse({status: 200, type: CommentResponse})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateComment(@Query('id') comment_id: string,
             @Body() dto: CreateCommentDTO, @Req() request): Promise<CommentResponse> {
    const user = request.user;
    return this.commentsService.updateComment(+comment_id, user.id, dto);
  }

  @ApiTags('Comments')
  @ApiResponse({status: 200, type: CommentResponse})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteComment(@Query('id') id: string, @Req() request): Promise<CommentResponse> {
    const user = request.user;
    return this.commentsService.deleteComment(+id, user.id);
  }
}
