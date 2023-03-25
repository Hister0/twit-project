import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { UpdateUserDTO } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponse } from "./response";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @ApiResponse({status: 200, type: [UserResponse]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiTags('Users')
  @ApiResponse({status: 200, type: UserResponse})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }

  @ApiTags('Users')
  @ApiResponse({status: 200, type: UserResponse})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    return this.usersService.deleteUser(request.user.email);
  }

  @ApiTags('Users')
  @ApiResponse({status: 200, type: UserResponse})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() dto: UpdateUserDTO, @Req() request): Promise<UserResponse> {
    const user = request.user;
    return this.usersService.updateUser(user.email, dto);
  }
}
