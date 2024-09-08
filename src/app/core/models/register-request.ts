export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  dateBirth?: Date;
  gender?: string;
}
