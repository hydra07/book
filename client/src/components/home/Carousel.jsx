import { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselBook = (props) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    setBooks(props.book);
  }, [props.book]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <div className=" w-3/4  m-auto ">
      <h2 className="text-2xl font-medium">
        Sách {books.type }{" "}
      </h2>
      <Slider {...settings} className="">
        {books.map((book) => (
          <div key={book.id} className=" mt-3 h-[400px]">
            <div className="rounded-t-xl  flex justify-center items-center">
              <img
                className=" w-44 rounded-xl"
                src={book.images || "svg/facebook.svg"}
                alt="facebook.svg"
              />
            </div>
            <div className="">
              <p className="text-center">{book.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselBook;
