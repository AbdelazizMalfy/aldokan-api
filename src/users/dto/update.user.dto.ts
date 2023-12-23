import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { RoleType } from './create.user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsEnum(RoleType)
  role?: 'user' | 'admin';

  @IsOptional()
  @IsString()
  avatar?: string;
}
