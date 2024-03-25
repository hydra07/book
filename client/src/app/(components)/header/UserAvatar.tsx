import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { signOut } from 'next-auth/react';
export default ({ user }: any) => {
  const handleLogout = () => {
    signOut({
      callbackUrl: '/',
    });
    // dispatch(logout());
  };
  // console.log(user !== undefined);
  return (
    <Menu>
      <MenuHandler>
        <div className="flex items-center gap-2 h-[42px]">
          <Avatar
            color="gray"
            size="md"
            src={
              user.image
                ? user.image
                : `https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg`
            }
            alt="User Avatar"
            placeholder={null}
          />
          <Typography
            color="white"
            children={user.name}
            placeholder={null}
          ></Typography>
        </div>
      </MenuHandler>
      <MenuList
        className="border-gray-400 bg-opacity-80 backdrop-blur-lg bg-black text-white"
        placeholder={null}
      >
        <MenuItem
          color="lightBlue"
          placeholder={null}
          onClick={() => {
            window.location.href = '/profile';
          }}
        >
          Tài khoản
        </MenuItem>
        <MenuItem
          color="lightBlue"
          onClick={handleLogout}
          className="flex items-center gap-2 "
          placeholder={null}
        >
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
