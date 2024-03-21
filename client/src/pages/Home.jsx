import CarouselShow from "../components/home/CarouselShow";
import { FooterWithSocialLinks } from "../components/home/Footer";
const Home = () => {
  // //  const slides = [
  //   "https://images7.alphacoders.com/133/1338193.png",
  //   "https://images5.alphacoders.com/132/1326363.png",
  //   "https://images3.alphacoders.com/167/167539.jpg",
  //   "https://images8.alphacoders.com/424/424848.jpg",
  // ];
  const slides = [
    {
      url: "https://images7.alphacoders.com/133/1338193.png",
    },
    {
      url: "https://images5.alphacoders.com/132/1326363.png",
    },
    {
      url: "https://images3.alphacoders.com/167/167539.jpg",
    },
    {
      url: "https://images8.alphacoders.com/424/424848.jpg",
    },
    {
      url: "https://images5.alphacoders.com/455/455726.jpg",
    },
  ];
  return (
    <div className="w-max-[1280px] content-center h-[3000px]">
      <div className="object-cover cursor-pointer w-full h-full rounded-[9px] ">
        <CarouselShow slides={slides} />
      </div>
      <div className="w-max-[1280px] h-[1400px] bg-white"></div>
      <div className="w-max-[1280px] h-[1400px] bg-black"></div>
      <FooterWithSocialLinks />
    </div>
  );
};
export default Home;
