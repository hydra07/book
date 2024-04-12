import { axiosWithAuth } from '@/lib/axios';
import Book from '@/types/book';
import User from '@/types/user';
import { FormEvent, useState } from 'react';
import { Comment } from './index';
const CommentForm = ({
  onSubmit,
  comment,
  book,
  user,
}: {
  onSubmit: () => void;
  comment?: Comment;
  book: Book;
  user: User;
}) => {
  const [content, setContent] = useState<string>('');
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
    const newComment = async (data: any) => {
      const res = await axiosWithAuth(user.accessToken).post(
        `/book/addComment/${book.id}`,
        data,
      );
      return res.data;
    };
    const replyComment = async (data: any) => {
      const res = await axiosWithAuth(user.accessToken).post(
        `/book/repyComment/${book.id}`,
        data,
      );
      return res.data;
    };
    // setContent('');
    console.log(content);
    if (comment) {
      replyComment({
        parent: {
          id: comment.id,
        },
        content,
      });
      console.log('reply', comment.id, content);
    } else {
      newComment({
        content,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            comment ? `Reply to ${comment.user.name}` : 'Write a comment'
          }
          className="w-full p-2 pr-16 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {comment ? 'Reply' : 'Comment'}
        </button>
      </div>
    </form>
  );
};
export default CommentForm;
