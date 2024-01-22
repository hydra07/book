import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ButtonRead = ({ book }) => {
  const navigate = useNavigate();
  const [isBookMark, setisBookMark] = useState(false);
  // TODO: get from api
  const ReadClick = () => {
    navigate(book.url);
  };
  const BookMarkClick = () => {
    setisBookMark(!isBookMark);
  };
  return (
    <div className="flex flex-row space-x-3 ">
      <Button
        className="text-white p-3 px-20 rounded-full bg-green-500 text-md flex transition ease-in-out delay-150  hover:bg-light-green-800 duration-150 "
        onClick={ReadClick}
      >
        <img src="/svg/book.svg" alt="" className="w-6 mx-1 " />
        Read
      </Button>
      {isBookMark ? (
        <Button
          className="rounded-full hover:bg-gray-500 px-4"
          onClick={BookMarkClick}
        >
          <img src="/svg/bookmark.svg" alt="" className=" w-6 mx-1" />
        </Button>
      ) : (
        <Button
          className="rounded-full hover:bg-gray-500 px-4"
          onClick={BookMarkClick}
        >
          <img src="/svg/unbookmark.svg" alt="" className=" w-6 mx-1" />
        </Button>
      )}

      {/* <Button
        href=""
        className=" mx-2 px-2  rounded-full bg-blue-gray-500 transition duration-150 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-deep-orange-500 "
      >
        <img src={imgShare} alt="" className="w-6 mx-1 " />
      </Button> */}
    </div>
  );
};
export default ButtonRead;
