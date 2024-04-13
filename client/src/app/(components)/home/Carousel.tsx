import React from "react";

const Carousel = () => {
  return (
    //     // <div
    //     //   id="controls-carousel"
    //     //   className="relative w-full"
    //     //   data-carousel="slide"
    //     // >
    //     //   {/* Carousel wrapper */}
    // <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
    //   {/* Item 1 */}
    //   <div className=" duration-700 ease-in-out" data-carousel-item>
    //     <img
    //       src="https://images.pexels.com/photos/19759118/pexels-photo-19759118/free-photo-of-dem-di-d-o-dang-lam-vi-c-dan-ong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //       className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //       alt="..."
    //     />
    //   </div>
    //   {/* Item 2 */}
    //   <div className="duration-700 ease-in-out" data-carousel-item="active">
    //     <img
    //       src="https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg"
    //       className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //       alt="..."
    //     />
    //   </div>
    //   {/* Item 3 */}
    //   <div className="duration-700 ease-in-out" data-carousel-item>
    //     <img src="" alt="..." />
    //   </div>
    //   {/* Item 4 */}
    //   <div className="duration-700 ease-in-out" data-carousel-item>
    //     <img
    //       src=""
    //       className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //       alt="..."
    //     />
    //   </div>
    //   {/* Item 5 */}
    //   <div className="duration-700 ease-in-out" data-carousel-item>
    //     <img
    //       src=""
    //       className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    //       alt="..."
    //     />
    //   </div>
    // </div>
    //     //   {/* Slider controls */}
    //     //   <button
    //     //     type="button"
    //     //     className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    //     //     data-carousel-prev
    //     //   >
    //     //     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    //     //       <svg
    //     //         className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
    //     //         aria-hidden="true"
    //     //         xmlns="http://www.w3.org/2000/svg"
    //     //         fill="none"
    //     //         viewBox="0 0 6 10"
    //     //       >
    //     //         <path
    //     //           stroke="currentColor"
    //     //           strokeLinecap="round"
    //     //           strokeLinejoin="round"
    //     //           strokeWidth="2"
    //     //           d="M5 1 1 5l4 4"
    //     //         />
    //     //       </svg>
    //     //       <span className="sr-only">Previous</span>
    //     //     </span>
    //     //   </button>
    //     //   <button
    //     //     type="button"
    //     //     className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    //     //     data-carousel-next
    //     //   >
    //     //     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    //     //       <svg
    //     //         className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
    //     //         aria-hidden="true"
    //     //         xmlns="http://www.w3.org/2000/svg"
    //     //         fill="none"
    //     //         viewBox="0 0 6 10"
    //     //       >
    //     //         <path
    //     //           stroke="currentColor"
    //     //           strokeLinecap="round"
    //     //           strokeLinejoin="round"
    //     //           strokeWidth="2"
    //     //           d="m1 9 4-4-4-4"
    //     //         />
    //     //       </svg>
    //     //       <span className="sr-only">Next</span>
    //     //     </span>
    //     //   </button>
    //     // </div>

    //overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96
    //block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2

    <div className=" mx-auto">
      <div id="default-carousel" className="relative" data-carousel="static">
        <div className="relative h-120 overflow-hidden rounded-lg md:h-96 xl:h-96 2xl:h-96">
          <div className="duration-700 ease-in-out" data-carousel-item>
            <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl">
              Primer Slide
            </span>
            <img
              src="https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg"
              className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              alt="..."
            />
          </div>

          <div className="duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://images.pexels.com/photos/990432/pexels-photo-990432.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              alt="..."
            />
          </div>

          <div className="duration-700 ease-in-out" data-carousel-item>
            <img
              src="https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&w=600 "
              className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
              alt="..."
            />
          </div>
        </div>

        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
        </div>

        <button
          type="button"
          className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30  group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="hidden">Anterior</span>
          </span>
        </button>
        <button
          type="button"
          className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 0 group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="hidden">Siguiente</span>
          </span>
        </button>
      </div>

      <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
    </div>
  );
};

export default Carousel;
