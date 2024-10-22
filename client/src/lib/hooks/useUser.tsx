'use client';

import User from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function useUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>();
  const setInfor = async () => {
    // const _user: User = {
    //   id: session?.user.id as number,
    //   name: session?.user.name as string,
    //   email: session?.user.email as string,
    //   image: session?.user.image as string,
    //   phone: session?.user.phone as string,
    //   gender: session?.user.gender as boolean,
    // };
    const _user: User = { ...session?.user } as User;
    if (_user != undefined) {
      setUser(_user);
    }
  };
  useEffect(() => {
    setInfor();
    // console.log(user);
  }, [session?.user]);

  const isAdmin = () => {
    if (!user || !user.role) return false;
    // console.log(user.role);
    if (user.role.includes('Administrator')) return true;
    // if (user.role.includes('Administrator')) {
    //   return true;
    // }
    return false;
  };
  return { user, status, isAdmin };
}
