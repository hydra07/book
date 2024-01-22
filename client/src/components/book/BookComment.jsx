import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import Comment from './Comment';
import FeedBack from './FeedBack';

const BookComment = ({ book }) => {
  const [showComment, setShowComment] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const handleOpenComment = () => {
    if (showComment) {
      setShowComment(false);
    } else {
      setShowComment(true);
    }
  };
  const handleOpenFeedback = () => {
    if (showFeedback) {
      setShowFeedback(false);
    } else {
      setShowFeedback(true);
    }
  };
  return (
    <div className="pt-5">
      <p className="text-4xl text-white">Độc giả nói gì về "{book.title}" </p>
      <div className="pt-7 flex flex-row">
        <Button
          className="bg-blue-gray-800 mr-3 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-150"
          onClick={handleOpenComment}
        >
          <span>Bình luận ({book.comment})</span>
        </Button>
        <Button
          className="bg-blue-gray-800 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-pink-600 duration-150"
          onClick={handleOpenFeedback}
        >
          <span>
            Đánh giá ({Object.values(book.rate).reduce((a, b) => a + b, 0)})
          </span>
        </Button>
      </div>
      <div className="  ">
        <div className="" style={{ display: showComment ? 'block' : 'none' }}>
          <Comment book={book} />
        </div>
        <div
          className="feedback"
          style={{ display: showFeedback ? 'block' : 'none' }}
        >
          <FeedBack book={book} />
        </div>
      </div>
    </div>
  );
};
export default BookComment;
