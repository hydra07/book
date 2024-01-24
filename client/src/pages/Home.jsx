import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/home/BookCard';
import { getBooks } from '../store/book';
const Home = () => {
  const dispatch = useDispatch();
  const listBook = useSelector((state) => state.book.books);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch(getBooks());
    };
    fetchBooks();
  }, [dispatch]);
  useEffect(() => {
    setBooks(listBook);
  }, [listBook]);
  return (
    <div className="w-max-[1280px] content-center h-[3000px]">
      <div className="w-max-[1280px] h-[1400px] bg-white"></div>
      <div className="bg-blue-400 h-[1400px] ">
        {books.map((book) => {
          return <BookCard book={book} />;
        })}
      </div>
      <div className="w-max-[1280px] h-[1400px] bg-black"></div>
    </div>
  );
};
export default Home;
