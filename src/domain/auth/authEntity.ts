export interface AuthEntity {
  username: string;
  password: string;
}

export interface LoginEntity{
    userId: number;
    passwordValid: boolean;
}
