import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../../configurations';
import { AuthModule } from "../auth/auth.module";
import { TokenModule } from "../token/token.module";
import { PostsModule } from "../posts/posts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'postgresql',
          synchronize: true,
          autoLoadModels: true,
          models: [],
          connection: {
            host: configService.get('db_host'),
            port: configService.get('db_port'),
            user: configService.get('db_user'),
            password: configService.get('db_password'),
            database: configService.get('db_name'),
          },
        },
      }),
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
