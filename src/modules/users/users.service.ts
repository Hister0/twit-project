import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() readonly knex: Knex) {}

  getUsers() {
    return this.knex('users').select('*');
  }

  createUser() {
    return this.knex;
  }
}
