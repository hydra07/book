'use client';
import Book from '@/types/book';
import { Rating } from '@material-tailwind/react';

export default ({ book }: { book: Book }) => {
  const handleClick = () => {
    window.location.href = `/bookdetail/${book.id}`;
  };

  return (
    <div
      className="rounded-3xl bg-gray-900 mt-10 overflow-hidden hover:bg-blue-gray-600"
      onClick={handleClick}
    >
      <div key={book.id} className="flex space-x-4">
        {/* <div
          className="w-36 h-48 flex-none bg-cover text-center overflow-hidden"
          style={{ backgroundImage: `url('${book.imageUrl}')` }}
        ></div> */}
        <div className="flex-2">
          {/* <BookImage book={book} style={{ width: '100px', height: '150px' }} /> */}
          <img
            className="w-36 h-48 flex-none bg-cover text-center overflow-hidden"
            // TODO: Fix this
            src={book.imageUrl ? book.imageUrl : '/book-placeholder.jpg'}
            alt={book.title}
          />
        </div>
        <div className="p-5 mt-1 pr-5 space-y-2">
          <h1 className="text-lg font-semibold">{book.title}</h1>
          {/* <p><strong>Author:</strong> {book.author.name}</p> */}
          <p>
            <strong>Author:</strong> {book.author as any}
          </p>
          <p>
            {book.description
              ? book.description.slice(0, 100) + '...'
              : 'No description available'}
          </p>
          <div className="flex pt-10">
            <p className="text-gray-400 pr-2">Lượt xem: {book.views}</p>
            <svg className="w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
          </div>
        </div>
        <div className="flex p-5">
          <p className="top-0 pr-2">0.0</p>
          <div className="top-0"><Rating placeholder={null} value={0} /></div>
        </div>
      </div>
    </div>
  );
};

