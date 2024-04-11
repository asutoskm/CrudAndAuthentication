// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  // Injecting UserService and JwtService through constructor injection
  constructor(
    public userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registers a new user with the given CreateUserDto.
   * @param createUserDto The DTO containing the user's registration data.
   * @returns The created User entity.
   */
  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Authenticates a user and generates a JWT token if valid.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An object containing the JWT token.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async login(username: string, password: string): Promise<{ token: string }> {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return { token: this.jwtService.sign(payload) };
  }
}