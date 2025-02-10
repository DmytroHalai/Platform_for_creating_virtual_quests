interface IUser {
  id: number;
  username: string;
  email: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other'; // enum
  createdAt: string;
}

export default IUser;
