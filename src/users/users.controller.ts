import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { AccessTokenGuard } from 'src/common/guards/jwt.guard';
import { GetCurrentUserId } from 'src/common/decorators/get.current.user.id.decorator';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('current')
  @UseGuards(AccessTokenGuard)
  getCurrentUser(@GetCurrentUserId() userId: number): Promise<UserDTO> {
    return this.getUserById(userId);
  }

  //   @Get()
  //   findAll() {
  //     return this.usersService.findAll();
  //   }

  @Get('/user/:id')
  async getUserById(@Param('id') id: number): Promise<UserDTO> {
    const user = await this.usersService.getUserById(id);

    const userDto: UserDTO = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
      created: user.created,
      updated: user.updated,
      role: user.role,
      avatar: user.avatar,
    };

    return userDto;
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.usersService.update(+id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.usersService.remove(+id);
  //   }
}
