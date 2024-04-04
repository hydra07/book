// import axios from "../../../lib/axios";
// import Type from "@/app/(components)/type/index"
// // eslint-disable-next-line react/display-name
// export default async ({params}: { params: { id: number } }) => {
//     const res = await axios.get(`/test/token/getType/${params.id}`)
//     const type = await res.data;
//     if (!type){
//         return <div>Type not found!</div>
//     }
//     return (
//         <div>
//             <Type type={type} />
//         </div>)
// }


'use client'
import React from 'react';
import axios from '../../../lib/axios';
import Book from '@/types/book';
import BookCard from '@/app/(components)/type/BookCard';

export default async ({ params }: { params: { id: number } }) => {

  try {
    const res = await axios.get(`type/get/${params.id}`);
    const books: Book[] = await res.data.books;
    const typeName: string = res.data.name;
    const desc: string = res.data.description;
    return (
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="border ">
          <h2 className="text-4xl font-bold mb-4">{typeName}</h2>
          <h4 className="text-lg">{desc}</h4>
        </div>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

