// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

/**
 * JwtStrategy class extends the PassportStrategy to implement JWT authentication.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * JwtStrategy constructor.
   * @param authService - The injected AuthService to perform authentication.
   */
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the authorization header.
      ignoreExpiration: false, // Ensures the token has not expired.
      secretOrKey: jwtConstants.secret, // The secret or key for verifying the token's signature.
    });
  }

  /**
   * Validates the JWT payload.
   * @param payload - The decoded JWT payload.
   * @returns A promise that resolves with the validation result.
   */
  async validate(payload: any): Promise<{ userId: string; username: string; role: string }> {
    // Return the user's details extracted from the JWT payload.
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}