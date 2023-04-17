// src/auth/me.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class MeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;

    // accessToken이 'me'가 아닌 경우 권한 부족
    if (accessToken !== 'me') {
      throw new ForbiddenException();
    }

    return true;
  }
}
