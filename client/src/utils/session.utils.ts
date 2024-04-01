import { authOptions } from '@/server/auth';
import User from '@/types/user';
import { getServerSession } from 'next-auth';

/**
 * Retrieves the user session from the server and returns a User object.
 * @returns A Promise that resolves to a User object containing the user's information.
 */
export default async (): Promise<User | null> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return {
    id: session?.user.id as number,
    name: session?.user.name as string,
    email: session?.user.email as string,
    image: session?.user.image as string,
    phone: session?.user.phone as string,
    gender: session?.user.gender as boolean,
  } as User;
};
