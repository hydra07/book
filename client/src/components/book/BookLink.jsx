import { Link, useNavigate } from "react-router-dom";
const BookLink = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    return () => {
      navigate(path);
    };
  };

  const element = ({ path, name }) => {
    return (
      <div>
        <span className=" text-[23px] pt-8 mb-8 flex text-white hover:text-green-500 ">
          <a className="cursor-pointer" onClick={handleClick(path)}>
            {name}
          </a>
        </span>
      </div>
    );
  };
  return (
    <div className="pl-7 flex whitespace-nowrap">
      {element({ path: "/home", name: "Trang chủ" })}
      <img
        src="/svg/slash.svg"
        alt=""
        width={"20px"}
        className="drop-shadow-xl"
      />
      {element({ path: "/bookdetail", name: book.title })}
    </div>
  );
};
export default BookLink;
