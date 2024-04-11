// local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';

/**
 * LocalStrategy class extends PassportStrategy to implement local authentication.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Call to super to initialize the parent class, PassportStrategy.
    super();
  }

  /**
   * Validates a user's credentials.
   * 
   * @param username The username provided by the user.
   * @param password The password provided by the user.
   * @returns The validated user object or throws an UnauthorizedException.
   */
  async validate(username: string, password: string): Promise<User> {
    // Attempt to validate the user with the provided credentials.
    const user = await this.authService.userService.validateUser(username, password);
    if (!user) {
      // If validation fails, throw an UnauthorizedException.
      throw new UnauthorizedException('Invalid credentials');
    }
    // If validation is successful, return the user object.
    return user;
  }
}