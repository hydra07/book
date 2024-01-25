const BookCard = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>{book.price} $</p>
      <p>Status: {book.status}</p>
      <p>Created At: {book.createdAt}</p>
      <p>Last Updated At: {book.lastUpdateAt}</p>
      <p>
        URL: <a href={book.url}>{book.url}</a>
      </p>
      <div>
        <h3>Images:</h3>
        {book.images.map((image, index) => (
          <img key={index} src={image} alt="book" />
        ))}
      </div>
      <div>
        <h3>Types:</h3>
        {book.types.map((type, index) => (
          <p key={index}>{type}</p>
        ))}
      </div>
    </div>
  );
};
export default BookCard;
