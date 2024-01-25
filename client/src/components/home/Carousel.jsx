import { useEffect, useState } from "react";
const CarouselBook = (props) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    setBooks(props.book);
  },[props.book]);

  return (
    <div id="carousel-example" className="relative w-full">
      <div className="relative   rounded-lg ">
        <div id="carousel-item-1" className=" duration-700 ease-in-out my-20 ">
          <div className="flex items-center w-max">
            <h2 className="text-2xl font-medium cursor-pointer">
              Sách yêu thích{" "}
            </h2>
          </div>

          <div className="flex justify-center w-max  mt-[35px]   backdrop-blur-xl relative ">
            {books.map((book) => (
              <div key={book.id}> 
                <div className="inline-block lg:w-[350px] xl:w-72 2xl:w-[265px] cursor-pointer float-left mr-[42px] last:mr-[50px]  ">
                  <img
                    className="w-[1140px]"
                    src={book.images}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      The Coldest Sunset
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="inline-block lg:w-[350px] xl:w-72 2xl:w-[265px] cursor-pointer float-left mr-[42px] last:mr-[50px]  ">
              <img
                className="w-[1140px]"
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              </div>
            </div>
            <div className="clainline-block relative show-tooltip lg:w-52 xl:w-56 2xl:w-[265px] cursor-pointer float-left mr-[42px] last:mr-[50px]ssName">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              </div>
            </div>
            <div className="clainline-block relative show-tooltip lg:w-52 xl:w-56 2xl:w-[265px] cursor-pointer float-left mr-[42px] last:mr-[50px]ssName">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              </div>
            </div>
            <div className="clainline-block relative show-tooltip lg:w-52 xl:w-56 2xl:w-[265px] cursor-pointer float-left mr-[42px] last:mr-[50px]ssName">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              </div>
            </div>
            <div className="inline-block relative show-tooltip lg:w-52 xl:w-56 2xl:w-[265px] cursor-pointer float-left mr-[42px] last:mr-[50px]">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              </div>
            </div>
            <div className="inline-block relative show-tooltip lg:w-52 xl:w-56 2xl:w-[265px] cursor-pointer float-left mr-[42px] last:mr-[50px]">
              <img
                className="w-full"
                src="https://media.istockphoto.com/photos/other-picture-id480784006?k=6&m=480784006&s=170667a&w=0&h=1rNNTombmT0ULuZ61ud9ebDmnYGlWL9mF46XDlSe5ps="
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              </div>
            </div> */}
            {/* <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div> */}
          </div>
          {/* <img
          src="https://media.istockphoto.com/photos/other-picture-id480784006?k=6&m=480784006&s=170667a&w=0&h=1rNNTombmT0ULuZ61ud9ebDmnYGlWL9mF46XDlSe5ps="
          className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
          alt="..."
        /> */}
        </div>

        {/* <div id="carousel-item-2" className=" duration-700 ease-in-out">
        <img
          src="https://media.istockphoto.com/photos/other-picture-id480784006?k=6&m=480784006&s=170667a&w=0&h=1rNNTombmT0ULuZ61ud9ebDmnYGlWL9mF46XDlSe5ps="
          className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
          alt="..."
        />
      </div>

      <div id="carousel-item-3" className=" duration-700 ease-in-out">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
          alt="..."
        />
      </div>

      <div id="carousel-item-4" className=" duration-700 ease-in-out">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
          alt="..."
        />
      </div> */}
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        <button
          id="carousel-indicator-1"
          type="button"
          className="h-3 w-3 rounded-full"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          id="carousel-indicator-2"
          type="button"
          className="h-3 w-3 rounded-full"
          aria-current="false"
          aria-label="Slide 2"
        ></button>
        <button
          id="carousel-indicator-3"
          type="button"
          className="h-3 w-3 rounded-full"
          aria-current="false"
          aria-label="Slide 3"
        ></button>
        <button
          id="carousel-indicator-4"
          type="button"
          className="h-3 w-3 rounded-full"
          aria-current="false"
          aria-label="Slide 4"
        ></button>
      </div>

      <button
        id="data-carousel-prev"
        type="button"
        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800"
            aria-="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" d="M5 1 1 5l4 4" />
          </svg>
          <span className="">Previous</span>
        </span>
      </button>
      <button
        id="data-carousel-next"
        type="button"
        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800"
            aria-="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" d="m1 9 4-4-4-4" />
          </svg>
          <span className="">Next</span>
        </span>
      </button>
    </div>
  );
};

export default CarouselBook;
