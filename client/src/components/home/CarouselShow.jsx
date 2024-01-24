import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

const CarouselShow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className="header">
      <Slider {...settings}>
        <div>
          <img
            src="https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg"
            alt="Image 1"
            className="small-image "
          />
        </div>
        <div className="image-backrgound">
          <img
            src="https://wallpapers.com/images/high/book-background-6kqj35nciqjfiflz.webp"
            alt="Image 2"
            className="small-image w-full"
          />
        </div>
        <div>
          <img
            src="https://wallpapers.com/images/hd/book-background-6tfystp15nm6cjlu.jpg"
            alt="Image 3"
            className="small-image"
          />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselShow;
