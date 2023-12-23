import { GoogleAuthGuard } from './google.auth.guard';
import { AccessTokenGuard } from './jwt.guard';
import { RefreshTokenGuard } from './jwt.rt.guard';

export = [AccessTokenGuard, RefreshTokenGuard, GoogleAuthGuard];
