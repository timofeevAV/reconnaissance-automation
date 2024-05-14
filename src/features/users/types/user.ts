export interface User {
  id: number;
  email: string | null;
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  role: string | null;
  password?: string;
  re_password?: string;
}
