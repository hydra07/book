'use client';
import axios from '@/lib/axios';
import useUser from '@/lib/hooks/useUser';
import Book from '@/types/book';
import { useCallback, useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
interface User {
  id: number;
  name: string;
  image: string;
}
export interface Comment {
  id: number;
  content: string;
  user: User;
  parent: number | null;
  left: number;
  right: number;
  createdAt: string;
}

interface Props {
  // comments: Comment[];
  book: Book;
}

const CommentComponent: React.FC<Props> = ({
  // comments,
  book,
}) => {
  // if (!comments) return null;

  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState<number>(3);
  const [visibleReplies, setVisibleReplies] = useState<Record<number, number>>(
    {},
  );
  const rootComments = comments
    .filter((comment) => comment.parent === null)
    .sort((a, b) => b.id - a.id);
  const replies = comments.filter((comment) => comment.parent !== null);
  const sortedReplies = replies.sort((a, b) => {
    const diff = a.right - a.left - (b.right - b.left);
    if (diff !== 0) {
      return diff;
    }
    return b.id - a.id;
  });

  const handleLoadMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 3);
  };
  const handleShowLessComments = () => {
    setVisibleComments((prevVisibleComments) =>
      Math.max(prevVisibleComments - 3, 3),
    );
  };
  const handleLoadMoreReplies = (commentId: number) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [commentId]: (prevVisibleReplies[commentId] || 3) + 3,
    }));
  };

  const handleShowLessReplies = (commentId: number) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [commentId]: Math.max((prevVisibleReplies[commentId] || 3) - 3, 3),
    }));
  };

  const [isOpenCommentForm, setIsOpenCommentForm] = useState<boolean>(false);

  const [replyTo, setReplyTo] = useState<number | null>(null);

  const handleReply = (commentId: number) => {
    if (replyTo === commentId) {
      setReplyTo(null);
    } else {
      setReplyTo(commentId);
    }
  };

  const handleSubmit = useCallback(() => {
    setReplyTo(null); // reset the replyTo state
    setIsOpenCommentForm(false);
  }, [isOpenCommentForm]);

  useEffect(() => {
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
    fetchComment(book).then((comments) => {
      console.log(comments);
      setComments(comments);
    });

    // return () => {
    //   setComments([]);
    // };
  }, [book, handleSubmit]);

  const { user, status } = useUser();

  return (
    <div className="space-y-4">
      {/* {replyTo === null && <CommentForm onSubmit={handleSubmit} />} */}
      {user && user.accessToken && (
        <>
          {isOpenCommentForm ? (
            <div>
              <CommentForm onSubmit={handleSubmit} user={user} book={book} />
              <button
                className="bg-red-400 text-white w-full px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpenCommentForm(false)}
              >
                Đóng
              </button>
            </div>
          ) : (
            <button
              className="bg-gray-800 text-white w-full px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsOpenCommentForm(true)}
            >
              Comment
            </button>
          )}
        </>
      )}
      {rootComments.slice(0, visibleComments).map((comment) => (
        <CommentItem key={comment.id} comment={comment}>
          <button onClick={() => handleReply(comment.id)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 12L9.5 17M4.5 12L9.5 7M4.5 12L14.5 12C16.1667 12 19.5 11 19.5 7"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="matrix(-1, 0, 0, 1, 24, 0)"
              />
            </svg>
          </button>
          {user && user.accessToken && (
            <>
              {replyTo === comment.id && (
                <CommentForm
                  onSubmit={handleSubmit}
                  comment={comment}
                  book={book}
                  user={user}
                />
              )}
            </>
          )}
          <div className="ml-12 space-y-2">
            {sortedReplies
              .filter(
                (reply) =>
                  reply.left >= comment.left && reply.right <= comment.right,
              )
              .slice(0, visibleReplies[comment.id] || 3)
              .map((reply) => (
                <CommentItem key={reply.id} comment={reply}>
                  <button onClick={() => handleReply(reply.id)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 12L9.5 17M4.5 12L9.5 7M4.5 12L14.5 12C16.1667 12 19.5 11 19.5 7"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="matrix(-1, 0, 0, 1, 24, 0)"
                      />
                    </svg>
                  </button>
                  {user && user.accessToken && (
                    <>
                      {replyTo === reply.id && (
                        <CommentForm
                          onSubmit={handleSubmit}
                          comment={reply}
                          user={user}
                          book={book}
                        />
                      )}
                    </>
                  )}
                </CommentItem>
              ))}
            {(visibleReplies[comment.id] || 3) <
              sortedReplies.filter(
                (reply) =>
                  reply.left >= comment.left && reply.right <= comment.right,
              ).length && (
              <button onClick={() => handleLoadMoreReplies(comment.id)}>
                Load more replies
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
            {(visibleReplies[comment.id] || 3) > 3 && (
              <button onClick={() => handleShowLessReplies(comment.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </CommentItem>
      ))}
      {visibleComments < rootComments.length && (
        <button onClick={handleLoadMoreComments}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
      {visibleComments > 3 && (
        <button onClick={handleShowLessComments}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CommentComponent;
