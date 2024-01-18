function BookDetail(props) {
  return (
    <div className="pt-20 container bg-black">
      <div className="flex text-white ">
        <a
          href=""
          className="text-13-13 cursor-pointer text-f2f nuxt-link-active"
        >
          trang chủ
        </a>

        <img src="/svg/right.svg
        " alt="" width={"12px"}
        className="" />
        <p className="book-name">{props.name}</p>
      </div>
      <div className="book-image">
        <img src="" alt="" />
      </div>
    </div>
  );
}
export default BookDetail;
