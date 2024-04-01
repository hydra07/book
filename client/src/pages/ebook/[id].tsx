import EbookViewer from '@/app/(components)/EbookViewer';
import '@/app/globals.css';
import axios from '@/lib/axios';
import store from '@/lib/store';
import Book from '@/types/book';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Provider } from 'react-redux';

export const getStaticPaths = (async () => {
  const res = await axios.get(`/book/getAll`);
  const books = await res.data;
  const path = books.map((book: any) => ({
    params: {
      id: book.id.toString(),
    },
  }));
  return {
    paths: path,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const res = await axios.post(`/book/find/${context.params?.id}`);
  console.log(context.params?.id);
  const book = (await res.data) as Book;
  return { props: { book } };
}) satisfies GetStaticProps;

export default ({ book }: { book: Book }) => {
  console.log(book);
  if (!book) {
    return <div>Book not found!</div>;
  } else {
    return (
      <Provider store={store}>
        <EbookViewer book={book} />
      </Provider>
    );
  }
};
