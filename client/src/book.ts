import unidecode from "unidecode";

// export
type Book = {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  createdAt: string;
  lastUpdateAt: string;
  url: string;
  images: string[];
  types: string[];
};
const books = [
  {
    id: 1,
    title: 'Nhà giả kim',
    description:
      'Nhà giả kim là một tác phẩm tiểu thuyết kinh điển của nhà văn người Brazil, Paulo Coelho. Cuốn sách xoay quanh hành trình tìm kiếm ý nghĩa cuộc sống và sự chuyển đổi cá nhân của nhân vật chính Santiago. Với sự kết hợp giữa tâm lý học, triết học và tôn giáo, Nhà giả kim đã trở thành một trong những cuốn sách bán chạy nhất trong lịch sử xuất bản.',
    price: 100,
    status: 'Còn hàng',
    createdAt: '2020-01-01',
    lastUpdateAt: '2020-02-01',
    url: 'https://nhagiakim.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.fm_audio_book/0/0/0/587.jpg?v=2&w=480&h=700',
      // 'https://image2.jpg',
    ],
    types: ['Tiểu thuyết', 'Văn học nước ngoài'],
  },
  {
    id: 2,
    title: 'Đồi gió hú',
    description:
      'Đồi gió hú của Emily Brontë là một kiệt tác văn học lãng mạn của thế kỷ 19. Cuốn sách kể về tình yêu đầy bi thương giữa Catherine và Heathcliff, cùng với những bí mật, trắc trở trong gia đình Earnshaw. Đồi gió hú đã chạm đến những khía cạnh sâu sắc của tâm hồn con người và được đánh giá cao về sức ảnh hưởng trong văn hóa.',
    price: 120,
    status: 'Còn hàng',
    createdAt: '2020-03-01',
    lastUpdateAt: '2020-04-01',
    url: 'https://doigiohu.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.fm_audio_book/0/0/0/1484.jpg?v=2&w=480&h=700',
      // 'https://image4.jpg',
    ],
    types: ['Tiểu thuyết', 'Văn học nước ngoài', 'Lãng mạn'],
  },
  {
    id: 3,
    title: 'Sherlock Holmes',
    description:
      'Sherlock Holmes của Arthur Conan Doyle là bộ truyện trinh thám kinh điển, tập trung vào những vụ án mà thám tử tài năng Sherlock Holmes giải quyết cùng với đồng đội, bác sĩ John Watson. Cuốn sách không chỉ là những câu chuyện hấp dẫn mà còn là sự sáng tạo của nhà văn với nhân vật siêu thông minh và các kịch bản gây chú ý.',
    price: 90,
    status: 'Còn hàng',
    createdAt: '2020-05-01',
    lastUpdateAt: '2020-06-01',
    url: 'https://sherlockholmes.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/47113.jpg?v=1&w=480&h=700',
      // 'https://image6.jpg',
    ],
    types: ['Truyện trinh thám', 'Văn học nước ngoài'],
  },
  {
    id: 4,
    title: 'Dấu chân trên cát',
    description:
      'Dấu chân trên cát của Antoine de Saint-Exupéry là một tác phẩm văn học tuyệt vời, nơi tác giả chia sẻ những suy ngẫm về cuộc sống, tình yêu và ý nghĩa của sự tồn tại. Qua từng trang sách, độc giả sẽ bắt gặp những câu chuyện tuyệt vời và những bài học quý báu về lòng nhân ái và sự hiểu biết.',
    price: 110,
    status: 'Còn hàng',
    createdAt: '2020-09-01',
    lastUpdateAt: '2020-10-01',
    url: 'https://dauchantrencat.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/0/28165.jpg?v=1&w=480&h=700',
      // 'https://image10.jpg',
    ],
    types: ['Tiểu thuyết', 'Văn học nước ngoài', 'Phiêu lưu'],
  },
  {
    id: 5,
    title: 'Hạnh phúc không có sẵn',
    description:
      'Hạnh phúc không có sẵn của Wayne Dyer là một nguồn cảm hứng vô song, giúp độc giả khám phá cách họ có thể tạo ra cuộc sống hạnh phúc và ý nghĩa. Cuốn sách không chỉ là một hướng dẫn thực tế mà còn là một chuyến phiêu lưu tâm lý để khám phá sức mạnh lớn lao bên trong mỗi người.',
    price: 80,
    status: 'Còn hàng',
    createdAt: '2020-11-01',
    lastUpdateAt: '2020-12-01',
    url: 'https://hanhphuckhongcosan.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/0/28957.jpg?v=1&w=480&h=700',
      // 'https://image12.jpg',
    ],
    types: ['Phát triển bản thân', 'Tâm lý học'],
  },
  {
    id: 6,
    title: 'Những ngày thứ ba với Morrie',
    description:
      'Những ngày thứ ba với Morrie của Mitch Albom là một hành trình sâu sắc và ý nghĩa về tình bạn, ý nghĩa cuộc sống và sự hiểu biết về bản thân. Melodic và đầy cảm xúc, cuốn sách là một bài học về tình người và giá trị thực sự trong cuộc sống.',
    price: 95,
    status: 'Còn hàng',
    createdAt: '2021-01-01',
    lastUpdateAt: '2021-02-01',
    url: 'https://ngaythubamorrie.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/0/28897.jpg?v=1&w=480&h=700',
      // 'https://image14.jpg',
    ],
    types: ['Tâm lý học', 'Tự truyện'],
  },
  {
    id: 7,
    title: 'Người mẹ tốt làm thế nào',
    description:
      'Người mẹ tốt làm thế nào của Amy Chua là một tác phẩm nghiên cứu và trải nghiệm cá nhân về việc nuôi dạy con cái. Tác giả chia sẻ những chiến lược và kinh nghiệm của mình, mở ra cuộc thảo luận về cách xây dựng mối quan hệ gia đình và giáo dục con cái hiệu quả.',
    price: 105,
    status: 'Còn hàng',
    createdAt: '2021-03-01',
    lastUpdateAt: '2021-04-01',
    url: 'https://nguoimetotlamthehao.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/46942.jpg?v=3&w=480&h=700',
      // 'https://image16.jpg',
    ],
    types: ['Nuôi dạy con', 'Tâm lý học'],
  },
  {
    id: 8,
    title: 'Những ngày nắng mới',
    description:
      'Những ngày nắng mới là một tập thơ đẹp của nhà thơ nổi tiếng Việt Nam, Xuan Dieu. Trong từng bài thơ, tác giả đưa độc giả vào những cung bậc cảm xúc, từ tình yêu, lòng bi tráng đến những suy tư sâu sắc về cuộc sống và con người.',
    price: 75,
    status: 'Còn hàng',
    createdAt: '2021-05-01',
    lastUpdateAt: '2021-06-01',
    url: 'https://nhungngaynangmoi.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/46672.jpg?v=1&w=480&h=700',
      // 'https://image18.jpg',
    ],
    types: ['Thơ', 'Văn học nước ngoài'],
  },
  {
    id: 9,
    title: 'Bí mật của tâm hồn',
    description:
      'Bí mật của tâm hồn của Gary Chapman là một hành trình khám phá về tình yêu và mối quan hệ. Tác giả giới thiệu về "Ngôn ngữ tình yêu" và cách hiểu biết ngôn ngữ này có thể làm cho mối quan hệ trở nên sâu sắc và ý nghĩa hơn.',
    price: 88,
    status: 'Còn hàng',
    createdAt: '2021-09-01',
    lastUpdateAt: '2021-10-01',
    url: 'https://bimatcuatamhon.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/38711.jpg?v=1&w=480&h=700',
      // 'https://image20.jpg',
    ],
    types: ['Tâm lý học', 'Phát triển bản thân'],
  },
  {
    id: 10,
    title: 'Bí mật của tâm hồn 1',
    description:
      'Bí mật của tâm hồn của Gary Chapman là một hành trình khám phá về tình yêu và mối quan hệ. Tác giả giới thiệu về "Ngôn ngữ tình yêu" và cách hiểu biết ngôn ngữ này có thể làm cho mối quan hệ trở nên sâu sắc và ý nghĩa hơn.',
    price: 88,
    status: 'Còn hàng',
    createdAt: '2021-09-01',
    lastUpdateAt: '2021-10-01',
    url: 'https://bimatcuatamhon.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/38711.jpg?v=1&w=480&h=700',
      // 'https://image20.jpg',
    ],
    types: ['Tâm lý học', 'Phát triển bản thân'],
  },
  {
    id: 11,
    title: 'Bí mật của tâm hồn 2',
    description:
      'Bí mật của tâm hồn của Gary Chapman là một hành trình khám phá về tình yêu và mối quan hệ. Tác giả giới thiệu về "Ngôn ngữ tình yêu" và cách hiểu biết ngôn ngữ này có thể làm cho mối quan hệ trở nên sâu sắc và ý nghĩa hơn.',
    price: 88,
    status: 'Còn hàng',
    createdAt: '2021-09-01',
    lastUpdateAt: '2021-10-01',
    url: 'https://bimatcuatamhon.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/38711.jpg?v=1&w=480&h=700',
      // 'https://image20.jpg',
    ],
    types: ['Tâm lý học', 'Phát triển bản thân'],
  },
  {
    id: 12,
    title: 'Bí mật của tâm hồn 3',
    description:
      'Bí mật của tâm hồn của Gary Chapman là một hành trình khám phá về tình yêu và mối quan hệ. Tác giả giới thiệu về "Ngôn ngữ tình yêu" và cách hiểu biết ngôn ngữ này có thể làm cho mối quan hệ trở nên sâu sắc và ý nghĩa hơn.',
    price: 88,
    status: 'Còn hàng',
    createdAt: '2021-09-01',
    lastUpdateAt: '2021-10-01',
    url: 'https://bimatcuatamhon.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/38711.jpg?v=1&w=480&h=700',
      // 'https://image20.jpg',
    ],
    types: ['Tâm lý học', 'Phát triển bản thân'],
  },
  {
    id: 13,
    title: 'Bí mật của tâm hồn 4',
    description:
      'Bí mật của tâm hồn của Gary Chapman là một hành trình khám phá về tình yêu và mối quan hệ. Tác giả giới thiệu về "Ngôn ngữ tình yêu" và cách hiểu biết ngôn ngữ này có thể làm cho mối quan hệ trở nên sâu sắc và ý nghĩa hơn.',
    price: 88,
    status: 'Còn hàng',
    createdAt: '2021-09-01',
    lastUpdateAt: '2021-10-01',
    url: 'https://bimatcuatamhon.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/38711.jpg?v=1&w=480&h=700',
      // 'https://image20.jpg',
    ],
    types: ['Tâm lý học', 'Phát triển bản thân'],
  },
  {
    id: 13,
    title: 'Thám tử lừng danh Conan',
    description:
      'Thám tử lừng danh Conan là một bộ truyện tranh nổi tiếng của nhà văn Gosho Aoyama. Câu chuyện xoay quanh thám tử học đường tài năng Conan Edogawa, người giải quyết những vụ án hóc búa cùng đồng đội nhỏ tuổi của mình. Bộ truyện kết hợp giữa yếu tố trinh thám và hài hước, thu hút độc giả mọi lứa tuổi.',
    price: 65,
    status: 'Còn hàng',
    createdAt: '2021-11-01',
    lastUpdateAt: '2021-12-01',
    url: 'https://thamtuconan.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/0/23799.jpg?v=2&w=480&h=700',
      // 'https://image22.jpg',
    ],
    types: ['Truyện tranh', 'Truyện trinh thám'],
  },
  {
    id: 14,
    title: 'Tôi là Malala',
    description:
      'Tôi là Malala là tự truyện của Malala Yousafzai, người trở thành biểu tượng quốc tế trong cuộc chiến đấu cho quyền học của phụ nữ. Cuốn sách kể về cuộc sống của Malala từ thời thơ ấu đến hôm nay, mang lại cảm hứng và nhìn nhận sâu sắc về ý chí và lòng dũng cảm.',
    price: 115,
    status: 'Còn hàng',
    createdAt: '2022-01-01',
    lastUpdateAt: '2022-02-01',
    url: 'https://toilamalala.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/0/29965.jpg?v=1&w=480&h=700',
      // 'https://image24.jpg',
    ],
    types: ['Tự truyện', 'Văn học nước ngoài'],
  },
  {
    id: 15,
    title: 'Đắc nhân tâm',
    description:
      'Đắc nhân tâm của Dale Carnegie là một trong những cuốn sách phát triển bản thân hàng đầu. Tác giả chia sẻ những nguyên tắc cơ bản về cách xây dựng mối quan hệ, giao tiếp hiệu quả và làm việc nhóm một cách thành công. Cuốn sách là nguồn cảm hứng vô tận cho việc phát triển bản thân.',
    price: 98,
    status: 'Còn hàng',
    createdAt: '2022-03-01',
    lastUpdateAt: '2022-04-01',
    url: 'https://dacnhantam.com',
    images: [
      'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/0/10990.jpg?v=2&w=480&h=700',
      // 'https://image26.jpg',
    ],
    types: ['Phát triển bản thân', 'Kỹ năng sống'],
  },
];

function getListBookByType(books: Book[], type: string) {
  return books.filter((book) => book.types.includes(type));
}
function getAllBookTypes(books: Book[]) {
  const types = books.reduce((acc: string[], book) => {
    return [...acc, ...book.types];
  }, []);

  // return [...new Set(types)];
  return Array.from(new Set(types));
}
function getBookById(books: Book[], id: number) {
  return books.find((book) => book.id == id);
}

function getBookByStandardizationTitle(title: string, books: Book[]): Book | null {
  const result: Book | undefined = books.find((book) => {
    const titleBookStandar = unidecode(book.title.toLowerCase()).replace(/\s+/g, '-');
    if (title === titleBookStandar) {
      // console.log(`book la ${JSON.stringify(book)}`);
      return true;
    }
    return false;
  });
  return result || null;
  // throw Error('khong tim thay sach');
}
function getStandardizationTitle(book: Book) {
  const title: string = book.title;
  return unidecode(title).toLowerCase().replace(/\s+/g, '-');
}


// export default books;
export { getAllBookTypes, getBookById, getListBookByType, getBookByStandardizationTitle, getStandardizationTitle };