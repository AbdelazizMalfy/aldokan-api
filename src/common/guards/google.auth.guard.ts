import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Execute the original canActivate which performs the authentication
    const activate = (await super.canActivate(context)) as boolean;
    return activate;
  }
}
