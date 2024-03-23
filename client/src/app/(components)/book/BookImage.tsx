import Book from '@/types/book';
export default ({ book }: { book: Book }) => {
  return (
    <div className=" pl-8 w-[95%] relative ">
      <img src={book.imageUrl as string} className=" ml-2xl rounded-xl" />
    </div>
  );
};
