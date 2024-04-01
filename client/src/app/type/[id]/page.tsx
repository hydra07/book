// // import Type from "@/app/(components)/type/index";
// // import axios from "../../../lib/axios";
// // // eslint-disable-next-line react/display-name
// // export default async ({params}: { params: { id: number } }) => {
// //     const res = await axios.get(`/test/token/getType/${params.id}`)
// //     const type = await res.data;

// //     if (!type){
// //         return <div>Type not found!</div>
// //     }
// //     return (
// //         <div>
// //             <Type type={type} />
// //         </div>)
// // }
"use client";
import React, { useState, useEffect } from "react";
import axios from "../../../lib/axios";
import Book from "@/types/book";
import BookCard from "@/app/(components)/home/BookCard";

const TypePage: React.FC<{ params: { id: number } }> = ({ params }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get(`type/get/${params.id}`);
        const _book = await res.data.books;
        setBooks(_book);
        console.log(res);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchType();
  }, [params.id]);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-bold mb-4 pl-4">Type {params.id}</h2>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default TypePage;
