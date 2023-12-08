import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/newUser.dto';
import { UserDetails } from 'src/user/user.interface';
import { ExistUserDTO } from 'src/user/dtos/existUser.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: NewUserDTO): Promise<UserDetails | null | string> {
    const { username, email, password } = user;
    const existUser = await this.userService.findByEmail(email);
    if (existUser) return 'This email already busy!';

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(
      username,
      email,
      hashedPassword,
    );
    return this.userService._getUserDetails(newUser);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.validatePassword(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistUserDTO): Promise<{
    id: string;
    username: string;
    email: string;
  } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException(
        'Email or password is invalid!',
        HttpStatus.UNAUTHORIZED,
      );

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
