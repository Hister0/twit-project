import { Injectable } from "@nestjs/common";
import { InjectConnection } from "nest-knexjs";
import { Knex } from "knex";
import { CreatePostDTO, UpdatePostDTO } from "./dto";
import { PostResponse } from "./response";

@Injectable()
export class PostsService {
  constructor(@InjectConnection() readonly knex: Knex) {
  }

  async getAll() {
    return this.knex.table('posts');
  }

  async getUserPosts(id: number) {
    return this.knex.table('posts').where('user_id', id);
  }

  async getPost(id: number): Promise<PostResponse> {
    const post = await this.knex.table('posts').where('id', id);
    return post[0];
  }

  async createPost (user_id, dto: CreatePostDTO): Promise<PostResponse> {
    const post = {
      title: dto.title,
      message: dto.message,
      user_id: user_id
    }
    const  created = await this.knex.table('posts').insert(post, ['*']);
    return created[0];
  }

  async updatePost(id: number, user_id: number, dto: UpdatePostDTO): Promise<PostResponse> {
    const post = await this.knex.table('posts').where({'id': id, 'user_id': user_id}).update(dto, ['*']);
    return post[0];
  }

  async deletePost(id: number, user_id: number): Promise<PostResponse>{
    const post = await this.knex.table('posts').where('id', id)
      .where('user_id', user_id).delete(['*']);
    return post[0];
  }
}
