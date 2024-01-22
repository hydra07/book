import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AuthButton from './AuthButton';
import Search from './Search';
import User from './User';
const Header = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const token = useSelector((state) => state.auth.token);
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

  return (
    <header
      className={`w-full py-[11px] fixed top-0 backdrop-blur-md left-0 z-50 bg-black 
      ${isAtTop ? 'bg-opacity-20' : 'bg-opacity-70'}
      `}
    >
      <div className="w-full  px-14">
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
                <a href="./" className="text-white">
                  Sách
                </a>
              </div>
              <div className="py-2.5">
                <a href="/" className="text-white">
                  Thể loại
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-6 h-fit items-center whitespace-nowrap">
            <Search />
            {!token ? <AuthButton /> : <User />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
