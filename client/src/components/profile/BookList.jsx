import React from 'react';

const BookList = ({ books }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Your Books</h3>
      {books.length === 0 ? (
        <p className="text-gray-500">No books available.</p>
      ) : (
        <div>
          {books.map((book) => (
            <div key={book.id} className="mb-6 p-4 bg-gray-800 rounded-lg">
              {/* Book image */}
              <img src={book.image} alt={`Book ${book.id}`} className="w-full h-48 object-cover mb-4 rounded-lg" />

              {/* Render book details */}
              <p className="text-blue-500 font-bold text-xl mb-2">{book.title}</p>
              <p className="text-gray-400">{book.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
