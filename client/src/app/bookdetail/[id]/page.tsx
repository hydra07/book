import ErrorHandle from '@/app/(components)/ErrorHandle';
import BookDescriptions from '@/app/(components)/book/BookDescriptions';
import BookImage from '@/app/(components)/book/BookImage';
import Breadcrumbs from '@/app/(components)/book/Breadcrumbs';

import axios from '@/lib/axios';
import Book from '@/types/book';

import CommentComponent, { Comment } from '@/app/(components)/comment';
const fetchComment = async (book: Book | null) => {
  if (!book) return [];
  try {
    const res = await axios.get(`/book/getAllCommentByBook/${book.id}`);
    const comments: Comment[] = res.data.map((comment: Comment) => ({
      id: comment.id,
      content: comment.content,
      user: comment.user,
      parent: comment.parent,
      left: comment.left,
      right: comment.right,
      createdAt: comment.createdAt,
    }));
    return await comments;
  } catch (error) {
    return [];
  }
};
const fetchBook = async (id: any) => {
  try {
    const res = await axios.post(`/book/find/${id}`);
    return await res.data;
  } catch (error) {
    return null;
  }
};

export default async ({ params }: { params: { id: number } }) => {
  const book = await fetchBook(params.id);
  const comments = await fetchComment(book);
  if (!book) {
    return <ErrorHandle message={`Không tìm thấy book với id:${params.id}`} />;
  } else {
    return (
      <div className="pt-20 flex flex-col">
        <div className="">
          <Breadcrumbs book={book} />
          <div className="flex flex-row p-5">
            <div className="basis-1/3 sticky">
              <BookImage book={book} />
            </div>
            <div className=" pl-4 basis-2/3">
              <div className="flex flex-col">
                <BookDescriptions book={book} />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>{' '}
        {/* This is the line */}
        <div className="p-5 w-4/6 self-center">
          <CommentComponent
            // comments={comments}
            book={book}
          />
        </div>
      </div>
    );
  }
};
