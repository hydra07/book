import { Button } from '@material-tailwind/react';
import { useState } from 'react';
const FollowButton = ({ isFollow }) => {
  const [follow, setFollow] = useState(0);
  const handleClick = () => {
    setFollow(!follow);
  };
  return (
    <div className="w-full items-center justify-center flex ">
      <div className="justify-center">
        <Button
          className="whitespace-nowrap space-x-2 h-10 w-30"
          onClick={handleClick}
        >
          {follow ? (
            <div className="flex flex-row whitespace-nowrap space-x-2 h-10 w-30 mb-2">
              <img src="/svg/follow.svg" className="w-4 mb-5" />
              <span className="mt-1">Follow</span>
            </div>
          ) : (
            <div className="flex flex-row whitespace-nowrap space-x-2 h-10 w-30">
              <img src="/svg/following.svg" className="w-4 mb-5" />
              <span className="mt-1">Following</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
export default FollowButton;
