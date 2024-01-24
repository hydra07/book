import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookTypes } from '../../store/type';
const TypeButton = () => {
  const types = useSelector((state) => state.type.types);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [type, setType] = useState();
  useEffect(() => {
    const fetchType = async () => {
      const action = await dispatch(getAllBookTypes());
    };
    fetchType();
    types.forEach((type) => {
      setType(type);
    });
    // console.log(type);
  }, [dispatch]);
  return (
    <Menu>
      <MenuHandler>
        <div className="text-white">Thể loại</div>
      </MenuHandler>
      <MenuList className="border-gray-400 bg-opacity-80 backdrop-blur-lg bg-black border-none">
        {types.map((type) => (
          <MenuItem key={type.id} color="lightBlue">
            <a href={`/type/`} className="text-white">
              {type.name}
            </a>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TypeButton;
