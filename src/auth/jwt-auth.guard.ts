import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }
      const [bearer, token] = <[string, string]>(
        (authorization as string).split(' ')
      );

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
