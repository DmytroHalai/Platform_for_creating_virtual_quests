export interface IUser {
  user_id: number;
}

export interface IGoogleUser {
  email: string;
  username: string;
  role: string;
  password: string;
  isEmailConfirmed: boolean;
}
