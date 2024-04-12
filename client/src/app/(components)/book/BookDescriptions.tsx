"use client";
import Book from "@/types/book";
import { Button } from "@material-tailwind/react";
import RatingBar from "./RatingBar";
import BookAuthor from "./BookAuthor";
import { useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default ({ book }: { book: Book }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleClick = () =>{
    axios.post(`/book/views/${book.id}`)
    window.location.href= `/ebook/${book.id}` ;
  }
  return (
    <div className="">
      <div className="text-white">
        <h1 className="text-4xl ">{book.title}</h1>
        <BookAuthor book={book} />
        <span className="rate flex py-3 ">
          <RatingBar book={book} />
        </span>
        <div className="flex">
          <p className="text-white">Lượt xem: </p>
          <div className="pl-3 pr-2 opacity-70">{book.views}</div>
          <svg className="w-4 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
        </div>
      </div>
      <span className="flex flex-row my-8 space-x-2">
        <div className="flex flex-row space-x-3 whitespace-nowrap">
          <p className="text-white"> Loại sách: </p>
          {book.types!.map((type, index) => (
            // eslint-disable-next-line react/jsx-key
            <Link
              href={`/type/${type.id}`}
              key={index}
              className="opacity-70 hover:opacity-100 text-white "
            >
              {type.name}
            </Link>
          ))}
          {/*<a href="/" key={index}*/}
          {/*   className="p-2 text-white  rounded-lg bg-blue-gray-500 hover:bg-blue-gray-800">{type.name}</a>))}*/}
        </div>
      </span>
      {/* <ButtonRead book={book} /> */}
      <Button placeholder={null} onClick={handleClick} > Read </Button>
      <div className="pt-8 flex space-x-1 ">
        <p className="text-white  text-md">
          {isExpanded
            ? book.description
            : `${book.description?.substring(0, 100)}`}
        </p>
        <button
          className="bg-none text-green-400 text-nowrap self-end"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      </div>
      {/* <BookComment book={book} /> */}
    </div>
  );
};

