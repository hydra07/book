// type Role = "ADMIN" | "USER" | "PRE";
type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  image: string;
  gender: boolean;
  // role: any;
};

export default User;
