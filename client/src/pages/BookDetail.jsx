import BookDescriptions from '../components/book/BookDescriptions';
import BookImage from '../components/book/BookImage';
import BookLink from '../components/book/BookLink';

function BookDetail() {
  const book = {
    title: 'Cẩm nang xử lý cực phẩm',
    rate: {
      Five: 5,
      Four: 2,
      Three: 1,
      Two: 0,
      One: 10000,
    },
    rating: 4.5,

    author: 'Mộng Huyễn Tư Thi',
    price: 100,
    image:
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/47140.jpg?v=1&w=480&h=700',
    rated: '/svg/rated.svg',
    unrate: '/svg/unrate.svg',
    feedback: '3',
    date: '09/12/2023',
    condition: 'End',
    category: 'Ảo tưởng',
    nxb: 'NXB Lao Động',
    type: 'sách điện tử',
    decription:
      'Tô Phức Đồng sống lại, chuyện cô làm đầu tiên chính là treo hết thảy nhà chồng cực phẩm lên tẩn cho một trận, tay không đánh cả chồng cũ.a',
    comment: 8,
    url: 'https://www.youtube.com/embed/5qap5aO4i9A',
  };

  return (
    <div className="bg-gray-700 pt-11">
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
