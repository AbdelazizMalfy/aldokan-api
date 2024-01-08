export class UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  phone?: string;
  created: Date;
  updated: Date;
  role: 'user' | 'admin';
  avatar?: string | null;
}
