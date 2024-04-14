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

// 'use client';
import BookCard from '@/app/(components)/type/BookCard';
import axios from '@/lib/axios';
import Book from '@/types/book';

const fectchingBooks = async (id: number) => {
  try {
    const res = await axios.get(`type/get/${id}`);
    return await res.data;
  } catch (error) {
    return null;
  }
};

export default async ({ params }: { params: { id: number } }) => {
  const data = await fectchingBooks(params.id);
  const books = data.books as Book[];
  const name = data.name;
  const description = data.description;
  if (!books) {
    return <div>Books not found!</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className=" p-4 rounded-lg shadow-lg ">
        <h2 className="text-4xl font-bold mb-4 text-white">{name}</h2>
        <h4 className="text-lg text-gray-700">{description}</h4>
      </div>
      <div className="flex flex-col space-y-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};