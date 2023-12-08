import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/user/dtos/newUser.dto';
import { UserDetails } from 'src/user/user.interface';
import { ExistUserDTO } from 'src/user/dtos/existUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null | string> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistUserDTO): Promise<UserDetails | null> {
    return this.authService.login(user);
  }
}
