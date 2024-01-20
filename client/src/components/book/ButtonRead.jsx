import { Button } from "@material-tailwind/react";
import { useState } from "react";

const ButtonRead = ({ book }) => {
  const [imgBook, setimgBook] = useState("/svg/book.svg");
  const [imgShare, setimgShare] = useState("/svg/share.svg");
  const [imgHeart, setimgHeart] = useState("/svg/liked.svg");
  return (
    <div className="flex flex-row ">
      <Button
        href=""
        className="text-white p-3 px-20 rounded-full bg-green-500 text-md flex transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-light-green-800 duration-150 "
      >
        <img src="/svg/book.svg" alt="" className="w-6 mx-1 " />
        Read
      </Button>
      <Button href="" className=" mx-2 px-2  rounded-full bg-blue-gray-500 transition duration-150 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-deep-orange-500 ">
        <img src={imgHeart} alt="" className=" w-6 mx-1" />
      </Button>
      <Button href="" className=" mx-2 px-2  rounded-full bg-blue-gray-500 transition duration-150 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-deep-orange-500 ">   
      <img src={imgShare} alt="" className="w-6 mx-1 " />
      </Button>
    </div>
  );
};
export default ButtonRead;
