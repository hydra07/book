import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments available.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              {/* Render comment details */}
              <p className="text-blue-500 font-bold">{comment.title}</p>
              <p className="text-gray-700">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
