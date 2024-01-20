import { Button } from "@material-tailwind/react";
import { useState } from "react";
import SingUp from "../auth/SignUp";

export default function Comment({ book }) {
  return (
    <div className=" ">     
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
        <div className="flex flex-row my-4 ">
          <img src={book.image} alt="" className="w-8 mr-7    rounded-full" />
          <p className="bg-blue-gray-400 pr-80 pl-4 pt-3 rounded-full">
            bai tho that phong phu
          </p>
        </div>
        <div className="">
          <input type="text" className="rounded-full p-3" />
          <Button className="mx-6 py-4">Send</Button>
        </div>
      </div>
    </div>
  );
}
