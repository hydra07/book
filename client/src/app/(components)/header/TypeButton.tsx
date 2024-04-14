import axios from '@/lib/axios';
import Type from '@/types/type';
import { Button, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { Fragment, useEffect, useState } from 'react';

// const getStaticProps = async () => {

// 	return {
// 		props: { types },
// 		revalidate: 60,
// 	}
// }

export default () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const renderItem = () => {
    console.log(types);
    return types.map((type: any) => <div>{type}</div>);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/type/getAll`);
      // console.log(res.data);
      setTypes(res.data);
    };
    fetchData();
    // return () => {};
  }, [isMenuOpen]);


  return (
    <Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
        // className=""
      >
        <MenuHandler>
          <Button placeholder={null}>Thể loại</Button>
        </MenuHandler>
        <MenuList
          placeholder={null}
          className="bg-black outline-none border-none"
        >
          <div className="space-x-3">
            {types.map((type) => (
              <Button
                key={type.id}
                placeholder={null}
                onClick={() => {
                  window.location.href = `/type/${type.id}`;
                }}
              >
                {type.name}
              </Button>
            ))}
          </div>
        </MenuList>
      </Menu>
    </Fragment>
  );
};
