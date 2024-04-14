'use client';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Book from '@/types/book';
import { register } from 'swiper/element/bundle';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import BookCard from './BookCard';

export default ({ books }: { books: Book[] }) => {
  register();
  const swiper = () => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div className="w-screen pt-5">
      <div className="p-8 shadow-2xl">
      <div className="text-xl text-white">Top Lượt Xem</div>
        <div className="px-20">
          <div>{swiper()}</div>
        </div>
      </div>
    </div>
  );
};
