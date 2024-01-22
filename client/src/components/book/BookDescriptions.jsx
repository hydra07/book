import BookAuthor from './BookAuthor';
import BookComment from './BookComment';
import ButtonRead from './ButtonRead';
import Rating from './Rating';
const BookDescriptions = ({ book }) => {
  return (
    <div className=" ">
      <div className="text-white text-">
        <h1 className="text-4xl ">{book.title}</h1>
        <span className="rate flex py-3 ">
          <Rating book={book} />
        </span>
        <BookAuthor book={book} />
      </div>

      <span className="flex flex-row my-8">
        <p className="text-blue-gray-400 basis-1/10 pt-2 "> Loại sách </p>
        <a href="" className="text-white  rounded-lg bg-blue-gray-500 p-2  ">
          {book.type}
        </a>
      </span>
      <ButtonRead book={book} />
      <p className="text-white pt-8 text-md">{book.decription}</p>
      <BookComment book={book} />
    </div>
  );
};

export default BookDescriptions;
