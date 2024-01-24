import CarouselShow from "../components/home/CarouselShow";
const Home = () => {
  return (
    <div className="w-max-[1280px] content-center h-[3000px]">
      <CarouselShow />
      <div className="w-max-[1280px] h-[1400px] bg-white"></div>
      <div className="w-max-[1280px] h-[1400px] bg-black"></div>
    </div>
  );
};
export default Home;
