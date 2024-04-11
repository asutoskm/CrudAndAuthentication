import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats.entity';
import { jwtConstants } from 'src/auth/constants';

/**
 * The `CatsModule` is responsible for providing the cats feature in the application.
 * It imports necessary modules like `UserModule` for user management,
 * `JwtModule` for JWT token handling, and `TypeOrmModule` for ORM support with the `Cat` entity.
 * It also declares `CatsController` to handle incoming requests and `CatsService` to provide business logic.
 */
@Module({
  // Controllers handle incoming requests and return responses to the client
  controllers: [CatsController],
  // Modules and services that this module depends on
  imports: [
    UserModule, // Module that includes user-related components
    JwtModule.register({
      secret: jwtConstants.secret, // JWT secret key for token signing
    }),
    TypeOrmModule.forFeature([Cat]), // Register `Cat` entity with TypeORM
  ],
  // Providers define classes that can be injected into other classes via dependency injection
  providers: [CatsService],
})
export class CatsModule {}