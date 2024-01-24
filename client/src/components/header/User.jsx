import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth';
import { getUser } from '../../store/user';
const User = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const action = await dispatch(getUser());
    };
    fetchProfile();
  }, []);

  return (
    <Menu>
      <MenuHandler>
        <div className="flex items-center gap-2 h-[42px]">
          <Avatar color="gray" size="md" src={user.avatar} alt="User Avatar" />
          <Typography color="white" children={user.name}></Typography>
        </div>
      </MenuHandler>
      <MenuList className="border-gray-400 bg-opacity-80 backdrop-blur-lg bg-black text-white">
        <MenuItem color="lightBlue">Tài khoản</MenuItem>
        <MenuItem
          color="lightBlue"
          onClick={handleLogout}
          className="flex items-center gap-2 "
        >
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default User;
