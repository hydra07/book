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
    // console.log(_user);
  };
  useEffect(() => {
    setInfor();
  }, [session?.user]);
  return { user, status };
}
