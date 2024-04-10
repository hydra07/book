'use client';
import useUser from '@/lib/hooks/useUser';
import { useEffect, useState } from 'react';
import AuthButton from './AuthButton';
import Search from './Search';
import TypeButton from './TypeButton';
import UserAvatar from './UserAvatar';
export default () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const { user, status, isAdmin } = useUser();
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setIsAtTop(false);
    } else {
      setIsAtTop(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // console.log('user ', JSON.stringify(user) === '{}' ? 'null' : user);
  return (
    <header
      className={`w-full py-[11px] fixed top-0 left-0 z-50 bg-black border-b border-gray-800 shadow-lg
      ${isAtTop ? 'bg-opacity-20' : 'bg-opacity-70'}
      `}
    >
      <div className="w-full px-14">
        <div className="flex justify-between gap-8">
          <div className="flex gap-12">
            <a
              href="/"
              className="block py-2.5 nuxt-link-exact-active nuxt-link-active"
            >
              <img src="" alt="" />
            </a>

            <div className="flex flex-1 gap-x-6 flex-wrap">
              <div className="py-2.5">
                <a href="/" className="text-white">
                  Home
                </a>
              </div>
              <TypeButton />
            </div>
          </div>

          <div className="flex gap-6 h-fit items-center whitespace-nowrap">
            <Search />
            {user && JSON.stringify(user) !== '{}' ? (
              <UserAvatar user={user} isAdmin={isAdmin}/>
            ) : (
              <AuthButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
