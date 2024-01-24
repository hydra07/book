import { Tooltip } from '@material-tailwind/react';
const BookCard = ({ book }) => {
  const handleClick = () => {
    window.location.href = `/bookdetail/${book.id}`;
  };

  const details = (
    <div className="w-[600px] h-[320px] relative bg-fixed rounded-lg bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 ">
      <div className="pt-8 pl-5">
        <div className="flex flex-col">
          <div className="text-white font-bold text-2xl p-3">{book.title}</div>
          <div className="text-white text-sm p-2 line-clamp-4">
            {book.description}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[380px]" onClick={handleClick}>
      <div className="inline-block pt-3">
        <Tooltip
          content={details}
          placement="top-end"
          offset={0}
          // interactive={true}
          dismiss={true}
          // visible={isHovered}
          className="bg-transparent rounded-lg"
        >
          <div className="w-[200px] h-[300px]">
            <img
              className="object-cover rounded-md"
              src={book.images[0]}
              alt={book.title}
            />
          </div>
        </Tooltip>
        <div className="text-white text-md pt-3 fixed">{book.title}</div>
      </div>
    </div>
  );
};

export default BookCard;
