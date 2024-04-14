'use client';
import Book from '@/types/book';
import { Rating } from '@material-tailwind/react';

export default ({ book }: { book: Book }) => {
  const rates = Math.floor(book.rating!);
  const handleClick = () => {
    window.location.href = `/bookdetail/${book.id}`;
  };

  return (
    <div
      className="rounded-3xl bg-gray-900 mt-10 overflow-hidden hover:bg-blue-gray-600 cursor-pointer"
      onClick={handleClick}
    >
      <div key={book.id} className="flex space-x-4">
          <img
            className="w-40 h-52 flex-none bg-cover text-center overflow-hidden"
            src={book.imageUrl ? book.imageUrl : '/book-placeholder.jpg'}
            alt={book.title}
          />
        <div className="p-5 mt-1 space-y-2">
          <h1 className="text-lg font-semibold">{book.title}</h1>
          <p>
            <strong>Tác giả:</strong> {book.author.name}
          </p>
          <p className="text-gray-400">
            {book.description
              ? book.description.slice(0, 150) + '...'
              : 'No description available'}
          </p>
          <div className="flex">
            <p className="text-gray-400 pr-2">Lượt xem: {book.views}</p>
            <svg className="w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
          </div>
        </div>
        <div className="flex p-5">
          <p className="top-0 pr-2">{book.rating}</p>
          <div className="top-0"><Rating placeholder={null} value={rates} /></div>
        </div>
      </div>
    </div>
  );
};
