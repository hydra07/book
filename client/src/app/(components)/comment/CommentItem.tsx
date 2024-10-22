import { formatDistanceToNow, parseISO } from 'date-fns';
import { Comment } from '.';
const CommentItem = ({
  comment,
  openForm,
  children,
}: {
  comment: Comment;
  openForm?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div key={comment.id} className="p-4 shadow rounded bg-gray-900 relative">
      <div className="flex items-center space-x-2">
        {/* {comment.id} */}
        <img
          src={
            comment.user.image
              ? comment.user.image
              : `https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg`
          }
          alt={comment.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="flex flex-row">
            <p className="font-bold">{comment.user.name}</p>
          </div>
          <p>{comment.content}</p>
        </div>
      </div>
      <p className="text-sm absolute top-2 right-2">
        {formatDistanceToNow(parseISO(comment.createdAt))} ago
        {/* {comment.createdAt} */}
      </p>
      {children}
    </div>
  );
};

export default CommentItem;
