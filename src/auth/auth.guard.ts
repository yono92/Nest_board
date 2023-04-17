import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;

    // accessToken이 없는 경우 인증 실패
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
