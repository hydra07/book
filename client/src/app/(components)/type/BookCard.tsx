import Book from '@/types/book';
import RatingBar from '../book/RatingBar';

export default ({ book }: { book: Book }) => {
  const handleClick = () => {
    window.location.href = `/bookdetail/${book.id}`;
  };

  return (
    <div className="rounded-3xl bg-gray-900 mt-10 transition ease-in-out hover:scale-105 hover:bg-gray-700 duration-150" onClick={handleClick}>
      <div key={book.id} className="flex space-x-4">
        <img className="w-36 h-auto rounded-l-3xl" src={book.imageUrl as string} width={480} height={700} />
        <div className="p-4">
          <h3 className="text-lg font-bold">{book.title}</h3>
          <p><strong>Author:</strong> {book.author.name}</p>
          <p>{book.description ? book.description.slice(0, 100) + '...' : 'No description available'}</p>
        </div>
      </div>
    </div>
  );
};

