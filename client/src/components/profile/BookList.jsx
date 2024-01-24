import React, { useState } from 'react';
import Book from './Book';

const BookList = ({ books }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="w-full p-5">
      <h3 className="text-2xl font-bold mb-4 text-white">Book</h3>
      {books.length === 0 ? (
        <p className="text-white">No books available.</p>
      ) : (
        <div className="w-full flex flex-col space-y-3">
          {books.map((book, index) => (
            <Book key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
