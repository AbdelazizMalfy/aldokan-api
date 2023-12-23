import { AuthGuard } from '@nestjs/passport';

export class JWTRtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
