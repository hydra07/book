'use client';
import Book from '@/types/book';

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
        <div className="p-4">
          <h3 className="text-lg font-bold">{book.title}</h3>
          {/* <p><strong>Author:</strong> {book.author.name}</p> */}
          <p>
            <strong>Author:</strong> {book.author as any}
          </p>
          <p>
            {book.description
              ? book.description.slice(0, 100) + '...'
              : 'No description available'}
          </p>
        </div>
      </div>
    </div>
  );
};
