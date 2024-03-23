import axios from '../lib/axios';
import Book from '../types/book';
import Home from '@/app/(components)/home';
export async function getStaticProps(){
  const res = await axios.get(`/book/getAll`)
  const books = res.data;
  return {
    props: {
      books,
    }
  }
}

const HomePage = ({books}:{books:Book[]}) => {
  return (
    <div>
      <Home listBook={books} />
    </div>
  )
};
export default HomePage;
