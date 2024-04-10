// type Role = "ADMIN" | "USER" | "PRE";
type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  image: string;
  gender: boolean;
  accessToken: string;
  role: Array<string>;
};

export default User;
