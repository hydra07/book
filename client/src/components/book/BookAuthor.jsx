const BookAuthor = ({ book }) => {
  return (
    <div className="container mx-auto ">
      <div className="flex flex-row ">
        <div className=" basis-1/3">
          <div className="author text-blue-gray-300 ">Tác giả </div>
          <div className="">{book.author}</div>
        </div>
        <div className="basis-1/3">
          <div className="author text-blue-gray-300">Thể loại </div>
          <div className="">{book.category}</div>
        </div>
        <div className="basis-1/3">
          <div className="author text-blue-gray-300">Nhà xuất bản </div>
          <div className="">{book.nxb}</div>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="basis-1/3">
          <div className="author text-blue-gray-300">Giá gói </div>
          <div className="">{book.price}.000 đồng</div>
        </div>
        <div className=" basis-1/3">
          <div className="author text-blue-gray-300 ">Ngày đăng </div>
          <div className="">{book.date}</div>
        </div>
        <div className="basis-1/3">
          <div className="author text-blue-gray-300">Trạng thái </div>
          <div className="">{book.condition}</div>
        </div>
      </div>
    </div>
  );
};
export default BookAuthor;
