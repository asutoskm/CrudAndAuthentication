// auth/jwt-auth.guard.ts

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Retrieve 'roles' metadata from the route handler
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // If no roles are defined, proceed with the default guard behavior
    if (!roles) {
      return super.canActivate(context);
    }

    // Extract the user object from the request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verify if the user has the required role
    if (!user || !user.role || !roles.includes(user.role)) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    // If user has the required role, proceed with the default guard behavior
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any): any {
    // Handle errors or absence of user in the request
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}