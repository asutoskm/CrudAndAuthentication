import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Retrieve roles metadata from the context
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    // Check if the authorization header is valid
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false; // Token not provided or invalid format
    }
    
    // Extract the token from the authorization header
    const token = authorizationHeader.split(' ')[1];

    // Decode the token to retrieve the payload
    const decodedToken = this.jwtService.decode(token);
    // Ensure the token contains the expected 'sub' (subject) property
    if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.sub) {
      return false; // Unable to decode token or user ID not found in payload
    }

    // Extract the user ID from the decoded token
    const userId = decodedToken.sub;
    
    // If a user ID is present, validate the user's role
    if (userId) {
      const user = await this.userService.getUserById(userId);
      // Check if the user's role matches any of the roles required for the route
      return roles.includes(user.role);
    }

    // If no user ID is present or the user's role is not allowed, deny access
    return false;
  }
}