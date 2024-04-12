import Book from '@/types/book';
import RatingBar from '../book/RatingBar';
import { Rating } from '@material-tailwind/react';

export default ({ book }: { book: Book }) => {
  const handleClick = () => {
    window.location.href = `/bookdetail/${book.id}`;
  };

  return (
    <div className="rounded-3xl bg-gray-900 mt-10 transition ease-in-out hover:scale-105 hover:bg-gray-700 duration-150 cursor-pointer" onClick={handleClick}>
      <div key={book.id} className="flex space-x-4">
        <img className="w-36 h-auto rounded-l-3xl" src={book.imageUrl as string} width={480} height={700} />
        <div className="p-5 mt-1 space-y-2">
          <p className="text-lg font-semibold">{book.title}</p>
          {/* <p>Tác giả: {book.author.name}</p> */}
          <p className="text-gray-400">{book.description ? book.description.slice(0, 100) + '...' : 'No description available'}</p>
          <div className="flex pt-20">
            <p className="text-gray-400 pr-2">Lượt xem: {book.views}</p>
            <svg className="w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>
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

