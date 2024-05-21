import { UserRole } from '../enums/user-role.enum';

export interface User {
  id?: string;
  email: string;
  login: string;
  role?: UserRole;
}
