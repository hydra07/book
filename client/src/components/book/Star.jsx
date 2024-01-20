const Star = ({ book }) => {
  const handleClick = book.handleClick;
  if (handleClick) {
    <img onClick={handleClick} src={book.rated} alt="" className="w-[12px]" />;
  }

  return (
    <img onChange={handleClick} src={book.unrate} alt="" className="w-[12px]" />
  );
};
export default Star;
