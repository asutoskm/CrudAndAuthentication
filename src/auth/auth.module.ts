// auth.module.ts

// Importing necessary modules and components for the authentication module
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

/**
 * AuthModule is a NestJS module that configures authentication mechanisms for the application.
 * It integrates Passport for authentication, JWT for token management, and custom strategies for authentication methods.
 */
@Module({
  imports: [
    PassportModule, // Enables the use of Passport for authentication.
    UserModule, // Incorporates user-related operations and services.
    JwtModule.register({ // Configures JWT with a secret and token expiration.
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService, // Provides authentication-related functionalities.
    JwtStrategy, // Implements JWT authentication strategy.
    LocalStrategy, // Implements local (username & password) authentication strategy.
  ],
  exports: [AuthService], // Makes AuthService available for import into other modules.
  controllers: [AuthController], // Registers controllers that handle authentication routes.
})
export class AuthModule {}