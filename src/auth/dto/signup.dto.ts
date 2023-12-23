import { IsNotEmpty, IsString } from 'class-validator';
import { LoginDto } from './login.dto';

export class SignupDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
