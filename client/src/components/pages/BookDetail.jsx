import BookImage from "../book/BookImage";
import BookDescriptions from "../book/BookDescriptions";
import BookLink from "../book/BookLink";
function BookDetail() {
  const book = {
    title: "Cẩm nang xử lý cực phẩm",
    rating: 3,
    author: "Mộng Huyễn Tư Thi",
    price: 100,
    image:
      "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/47140.jpg?v=1&w=480&h=700",
    rated: "/svg/rated.svg",
    unrate: "/svg/unrate.svg",
    feedback: "3",
    date: "09/12/2023",
    condition: "End",
    category: "Ảo tưởng",
    nxb: "NXB Lao Động",
    type: "sách điện tử",
    decription: " mo ta",
    comment: 8,
    feedback: 6,
  };

  return (
    <div className=" container ">
      <BookLink book={book} />
      <div className="flex flex-row p-5">
        <div className="basis-1/3">
          <BookImage book={book} />
        </div>
        <div className=" pl-4 basis-2/3">
          <BookDescriptions book={book} />
        </div>
      </div>
      <div className="carousel"></div>
    </div>
  );
}
export default BookDetail;
