import { Button } from "@material-tailwind/react";

export default function FeedBack({ book }) {
  return (
    <div
    className=""
    style={{ display:"block" }}
    id="formcomment"
  >
    <div className="flex flex-row my-4 ">
      <img src={book.image} alt="" className="w-8 mr-7    rounded-full" />
      <p className="bg-blue-gray-400 pr-80 pl-4 pt-3 rounded-full">
        bai tho that phong phu
      </p>
    </div>
    </div>
  );
}
