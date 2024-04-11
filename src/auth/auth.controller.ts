// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

/**
 * AuthController handles authentication requests such as login and registration.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user with the provided user details.
   * @param createUserDto The data transfer object for user creation.
   * @returns The result of the registration process.
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto);
  }

  /**
   * Authenticates a user with a username and password.
   * @param username The user's username.
   * @param password The user's password.
   * @returns The result of the authentication process.
   */
  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string): Promise<any> {
    return this.authService.login(username, password);
  }
}