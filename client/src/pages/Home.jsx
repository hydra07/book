
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getBooks } from "../store/book";
import axios from "axios";
import { Link } from "react-router-dom";
import CarouselBook from "../components/home/Carousel";

const Home = () => {
  const dispatch = useDispatch();
  const listBook = useSelector((state) => state.book.books);
  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/test/token/getBook`).then((res) => {
  //     setBooks(res.data);
  //   });
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/test/token/getBook');
        setBooks(response.data);
        console.log(response.status);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors
      }
    };

    fetchData();
  }, []); console.log("XXXXXXX: ",books.filter((e)=> (e.types).includes("Trùng sinh")));
  return (
  
    <div className="w-max-[1280px] content-center h-[3000px]">
      <div className="w-max-[1280px] h-[1400px] bg-white"></div>
      <div className="bg-blue-400 h-[1400px]">
        {/* <div className="">
        {books.map((book) => (
          
          <div key={book.id}>
            <Link to="/bookdetail">
              <BookCard book={book} />
            </Link>
          </div>
        ))}
        </div> */}
        {/* <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel> */}
        <CarouselBook book = {books.filter((e)=>  (e.types).includes('Ngôn tình' ))}/>
        <CarouselBook book = {books.filter((e)=> (e.types).includes("Hien dai") && (e.types).includes('Ngôn tình') )}/>
        <CarouselBook book = {books.filter((e)=> (e.types).includes("Hien dai") && (e.types).includes('Ngôn tình') && (e.types).includes('Trùng sinh'))}/>
      </div>
      <div className="w-max-[1280px] h-[1400px] "></div>
    </div>
  );
};
export default Home;
