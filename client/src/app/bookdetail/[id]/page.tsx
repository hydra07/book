import ErrorHandle from '@/app/(components)/ErrorHandle';
import BookDescriptions from '@/app/(components)/book/BookDescriptions';
import BookImage from '@/app/(components)/book/BookImage';
import Breadcrumbs from '@/app/(components)/book/Breadcrumbs';

import axios from '@/lib/axios';
import Book from '@/types/book';
export default async ({ params }: { params: { id: number } }) => {
  let book: Book | null = null;
  try {
    const res = await axios.post(`/book/find/${params.id}`);
    book = res.data;
  } catch (error) {}
  if (!book) {
    return <ErrorHandle message={`Không tìm thấy book với id:${params.id}`} />;
  } else {
    return (
      <div className="pt-20">
        <Breadcrumbs book={book} />
        <div className="flex flex-row p-5">
          <div className="basis-1/3">
            <BookImage book={book} />
          </div>
          <div className=" pl-4 basis-2/3">
            <BookDescriptions book={book} />
          </div>
        </div>
      </div>
    );
  }
};
