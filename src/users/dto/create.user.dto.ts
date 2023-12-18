export class CreateUserDto {
  userName: string;
  address?: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'user' | 'admin';
  avatar?: string;
}
