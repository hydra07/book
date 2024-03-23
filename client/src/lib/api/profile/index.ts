import { axiosWithAuth } from '@/lib/axios';
import User from '@/types/user';

/**
 * Hàm này dùng để lấy thông tin từ user
 * @param token - Token.
 * @returns Trả về User.
 */
async function getProfile(token: string): Promise<User> {
  console.log('token', token);
  const res = await axiosWithAuth(token).get('/user/getUser');
  return res.data as User;
}
async function editProfile(token: string, user: User): Promise<User> {
  // console.log('token', token);
  console.log('user', JSON.parse(JSON.stringify(user)));
  const res = await axiosWithAuth(token).post('/user/profile', user);
  console.log('res', JSON.stringify(res));
  console.log('res', res.data);
  return res.data as User;
}

export { editProfile, getProfile };
