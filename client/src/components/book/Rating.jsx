import Star from "./Star";
const Rating = ({ book }) => {
  return (
    <div className="rate text-white text-sm">
      <span className="flex">
        <div className=" mr-1">{book.rating}</div>
        <Star book={book} />
        <Star book={book} />
        <Star book={book} />
        <Star book={book} />
        <Star book={book} />
      </span>
    </div>
  );
};
export default Rating;
