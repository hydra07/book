'use client';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
// import { Book } from '@/book';
 import Book from '@/types/book';
import { register } from 'swiper/element/bundle';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import 'swiper/swiper-bundle.min.css';
import BookCard from './BookCard';
export default ({ type, books }: { type: string; books: Book[] }) => {
  register();
  const swiper = () => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        // effect={''}
        // cubeEffect={{
        //   shadow: true,
        //   slideShadows: true,
        //   shadowOffset: 20,
        //   shadowScale: 0.94,
        // }}
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
        <div className="text-xl text-white">{type}</div>
        <div className="px-20">
          <div>{swiper()}</div>
        </div>
      </div>
    </div>
  );
};
