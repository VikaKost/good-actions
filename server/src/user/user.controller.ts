import { Controller, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
  @Patch(':id')
  editUser(
    @Param('id') id: string,
    @Body('email') email: string,
    @Body('username') username: string,
  ): Promise<UserDetails | null> {
    return this.userService.edit(id, email, username);
  }
  @Delete(':id')
  deleten(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
