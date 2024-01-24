import React from 'react';

import BookList from '../components/profile/BookList';
import FollowButton from '../components/profile/FollowButton';
import User from '../components/profile/User';
const Fanpage = () => {
  const user = {
    name: 'Huy ',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocI4bZTZrwji5QDybOlNqoAbMkDjImZ76arY2WhSSoCVqbM=s96-c',
    gender: 1,
    followers: 100,
    following: 200,
    listBook: [
      {
        id: 1,
        image:
          'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/47080.jpg?v=1&w=480&h=700',
        title: 'Book 1',
        content:
          'Tất tần tật bí kíp tạo nên một cuốn sách hoàn thiện từ một biên tập viên có hơn 20 năm kinh nghiệm làm việc với các tác giả thuộc mọi thành phần trong xã hội.“Tôi biết trong tôi có cả một cuốn sách.”“Tôi luôn luôn mong muốn trở thành tác gia.” “Mọi người đều hỏi khi nào tôi mới bắt tay vào viết sách.” “Tôi đã có cốt truyện rồi, nhưng có vẻ chẳng bao giờ tôi có thời gian mà viết.” Đây chỉ là vài lời chia sẻ mà Kelly Notaras nghe hằng ngày từ những tác-giả-tương-lai ở khắp nơi trên thế giới. Những chuyên gia lâu năm với kinh nghiệm đầy m.ình muốn chia sẻ những bài học kiến thức hữu ích cho cộng đồng, những anh hùng đời thường vượt qua nghịch cảnh và muốn truyền cảm hứng cho người khác hay đơn giản hơn là những cá nhân muốn để lại tác phẩm cuộc đời của chính mì Trong thế giới biến động ngày nay, chúng ta luôn cần những “tiếng nói”, những câu chuyện như vậy. Hơn thế nữa, việc xuất bản sách chưa bao giờ đơn giản, dễ thực hiện hay có chi phí hợp lý. Đây cũng là lý do tại sao vẫn còn rất nhiều nhà lãnh đạo, những người chữa lành và những người yêu thích viết lách còn mắc kẹt ở vạch xuất phát.        Cuốn sách này sẽ chính là “ngọn đèn” soi tỏ đường bước cho họ, một con đường đơn giản với từng bước đi cụ thể giúp các “cây bút” biến ý tưởng thành tác phẩm hoàn chỉnh.Waka xin trân trọng giới thiệu Hành trình viết sách - Từ ý tưởng đến thực hiện - Kelly Notaras!',
      },
      {
        id: 2,
        image:
          'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/47080.jpg?v=1&w=480&h=700',
        title: 'Book 2',
        content: 'Book 2 content',
      },
      {
        id: 3,
        image:
          'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/47080.jpg?v=1&w=480&h=700',
        title: 'Book 3',
        content: 'Book 3 content',
      },
      {
        id: 4,
        image:
          'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/47080.jpg?v=1&w=480&h=700',
        title: 'Book 4',
        content: 'Book 4 content',
      },
    ],
  };

  return (
    <div className="pt-40 pb-10 bg-opacity-75 flex h-full backdrop-blur-sm bg-black">
      <div className="items-center w-full">
        <div className="flex items-center justify-center w-full">
          <div className="p-4 rounded shadow-2xl w-4/5 h-4/5 flex flex-col relative blue space-y-5 border border-black">
            <User user={user} />
            <FollowButton isFollow={1} />
            <div className="grid">
              <div className="grid grid-cols-2 gap-4">
                <BookList books={user.listBook} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fanpage;
