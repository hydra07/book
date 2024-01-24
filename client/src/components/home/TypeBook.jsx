import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from '../../utils/Swiper';
import BookCard from './BookCard';
export default ({ type, books }) => {
  const swiper = () => {
    return (
      <Swiper
        slidesPerView={5}
        breakpoints={{ 768: { slidesPerView: 4 } }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        mousewheel={books.length > 5 ? true : false}
        // scrollbar={{ draggable: false }}
        // on={{
        //   slideChange: () => console.log('slide changed'),
        //   progress: (s, progress) => console.log(`progress is ${progress}`),
        // }}
      >
        {books.map((book) => {
          return (
            <SwiperSlide key={book.title}>
              <BookCard book={book} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <div className="w-screen pt-5">
      <div className="p-8 shadow-2xl">
        <div className="text-xl text-white">{type}</div>
        <div className="">
          {/* <div className="left-0">
            <Button className="swiper-button-prev"></Button>
          </div> */}
          <div className="">{swiper()}</div>
          {/* <div className="right-0">
            <Button className="swiper-button-next"></Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// export default TypeBook;
