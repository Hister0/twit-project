import { Injectable } from "@nestjs/common";
import { InjectConnection } from "nest-knexjs";
import { Knex } from "knex";
import { CreateUserDTO, UpdateUserDTO } from "./dto";
import * as bcrypt from "bcrypt";
import { UserResponse } from "./response";

@Injectable()
export class UsersService {
  constructor(@InjectConnection() readonly knex: Knex) {}

  async getAll() {
    return this.knex.table('users').select('id', 'nickname', 'email');
  }

  async getUser(id: number): Promise<UserResponse> {
    const user = await this.knex.table('users').where('id', id).select('id', 'nickname', 'email');
    return user[0];
  }

  async deleteUser(email: string): Promise<UserResponse>{
    const user = await this.knex.table('users').where('email', email).delete(['id', 'nickname', 'email']);
    return user[0];
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UserResponse> {
    const user = await this.knex.table('users').where('email', email).update(dto, ['id', 'nickname', 'email']);
    return user[0];
  }

  async createUser(dto: CreateUserDTO): Promise<UserResponse> {
    dto.password = await this.hashPassword(dto.password);
    const user = await this.knex.table('users').insert(dto, ['id', 'nickname', 'email']);
    return user[0];
  }

  async findExistUser(emailOrNickname: string, column: string) {
    return this.knex.table('users').select().where(`${column}`, emailOrNickname);
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
}
