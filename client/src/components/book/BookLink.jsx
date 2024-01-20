const BookLink = ({book}) => {

  return (
    <div>
      <span className=" text-[10px] px-[48px] pt-8 flex text-white ">
        <a
          href=""
          className="text-13-13 cursor-pointer text-f2f nuxt-link-active"
        >
          Trang chủ
        </a>

        <img src="/svg/right.svg" alt="" width={"12px"} className="drop-shadow-2xl" />
        <p className="">{book.title}</p>
      </span>
    </div>
  );
};
export default BookLink;
