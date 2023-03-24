import { Injectable } from "@nestjs/common";
import { InjectConnection } from "nest-knexjs";
import { Knex } from "knex";
import { CreateUserDTO, UpdateUserDTO } from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectConnection() readonly knex: Knex) {}

  async getAll() {
    return this.knex.table('users').select('id', 'nickname', 'email');
  }

  async getUser(id: number): Promise<UpdateUserDTO> {
    const user = await this.knex.table('users').where('id', id).select('id', 'nickname', 'email');
    return user[0];
  }

  async deleteUser(email: string): Promise<boolean>{
    await this.knex.table('users').where('email', email).delete();
    return true;
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.knex.table('users').where('email', email).update(dto);
    return dto;
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.knex.table('users').insert(dto);
    return dto;
  }

  async findExistUser(emailOrNickname: string, column: string) {
    return this.knex.table('users').select().where(`${column}`, emailOrNickname);
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
}
