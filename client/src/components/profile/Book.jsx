import React, { useState } from 'react';
const Book = ({ book }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex rounded-md backdrop-blur-md bg-gray-600">
      <div className="p-5 w-3/5">
        <p
          className="text-blue-500 font-bold text-xl mb-2 hover:underline"
          onClick={() => {
            window.location.href = `/book/${book.id}`;
          }}
        >
          {book.title}
        </p>
        <div>
          <p className="text-white">
            {isExpanded ? book.content : `${book.content.substring(0, 100)}...`}
          </p>
          <button onClick={handleExpandClick} className="hover:text-blue-400">
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      </div>
      <div className="w-2/5 p-3 mr-3">
        <img
          src={book.image}
          alt={`Book ${book.id}`}
          className="h-48 object-cover mx-3 rounded-lg"
        />
      </div>
    </div>
  );
};
export default Book;
