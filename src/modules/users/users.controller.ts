import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { UpdateUserDTO } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({status: 200, type: UpdateUserDTO})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: UpdateUserDTO})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: Boolean})
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    return this.usersService.deleteUser(request.user.email);
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: UpdateUserDTO})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() dto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.usersService.updateUser(user.email, dto);
  }
}
