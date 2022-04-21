import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ) {

    const request = context.switchToHttp().getRequest();

    try{
      const cookie = request.cookies['token'];
      return this.jwtService.verify(cookie);
    }
    catch(e){
      return false;
    }
  }
}
