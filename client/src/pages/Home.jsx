import React, { useState } from 'react';
import TypeBook from '../components/home/TypeBook';
import books, {
  getAllBookTypes,
  getListBookByType,
} from '../components/home/book';

const Home = () => {
  const [listBook, setListBook] = useState(books);
  const [listBookType, setListBookType] = useState(getAllBookTypes(listBook));
  return (
    <div className="bg-gray-700 h-auto w-screen">
      <div className="pt-20">
        {listBookType.map((type) => {
          return (
            <TypeBook
              type={type}
              books={getListBookByType(listBook, type)}
              key={type}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
