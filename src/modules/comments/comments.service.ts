import { Injectable } from '@nestjs/common';
import { InjectConnection } from "nest-knexjs";
import { Knex } from "knex";
import { CommentResponse } from "./response";
import { CreateCommentDTO } from "./dto";

@Injectable()
export class CommentsService {
  constructor(@InjectConnection() readonly knex: Knex) {}

  async getPostComments(post_id) {
    return this.knex.table('comments').where('post_id', post_id);
  }

  async getUserComments(user_id: number) {
    return this.knex.table('comments').where('user_id', user_id);
  }

  async getComment(id: number): Promise<CommentResponse> {
    const comment = await this.knex.table('comments').where('id', id);
    return comment[0];
  }

  async createComment(post_id: number, user_id: number, dto: CreateCommentDTO): Promise<CommentResponse> {
    const comment = {
      message: dto.message,
      post_id: post_id,
      user_id: user_id
    }
    const created = await this.knex.table('comments').insert(comment, ['*']);
    return created[0];
  }

  async updateComment(comment_id: number, user_id: number, dto: CreateCommentDTO): Promise<CommentResponse> {
    const comment = await this.knex.table('comments')
      .where({'id': comment_id, 'user_id': user_id}).update(dto, ['*']);
    return comment[0];
  }

  async deleteComment(comment_id: number, user_id: number): Promise<CommentResponse>{
    const comment = await this.knex.table('comments').where('id', comment_id)
      .where('user_id', user_id).delete(['*']);
    return comment[0];
  }
}
