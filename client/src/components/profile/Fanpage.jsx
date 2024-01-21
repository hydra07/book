import React from 'react';
import UserProfile from './UserProfile';
import BookList from './BookList';
import Comments from './Comments';

const Fanpage = ({ user, books, comments }) => {
  return (
    <div>

      <div className="container mx-auto mt-8">
        <UserProfile name={user.name} gender={user.gender} image={user.image} />
        <div className="grid grid-cols-2 gap-8">
          <div>
            <BookList books={books} />
          </div>
          <div className="ml-96">
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fanpage;
