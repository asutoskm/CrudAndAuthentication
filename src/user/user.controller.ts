// user.controller.ts
import { Controller, Post, Body, ConflictException, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

// Controller handling authentication related requests
@Controller('auth')
export class UserController {
  // Injecting UserService for handling user-related operations
  constructor(private readonly userService: UserService) {}

  /**
   * Endpoint to register a new user.
   * @param createUserDto - Data Transfer Object containing user registration information
   * @returns The created user object or an error if the username is already taken
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Explicitly setting the HTTP status code to 201 for resource creation
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      // Attempt to create a new user with the provided details
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      // If username is already in use, throw a conflict exception
      throw new ConflictException('Username already exists');
    }
  }
}