import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { KnexModule } from "nest-knexjs";

@Module({
  imports: [KnexModule.f],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
