const User = ({ user }) => {
  return (
    <div className="">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex justify-center -mt-14 ">
          <img
            className="w-24 h-24 rounded-full mb-4 content-center shadow-2xl"
            src={user.avatar}
            alt="avatar"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex">
            {user.gender ? (
              <img src="/svg/male.svg" className="w-4 shadow-sm" />
            ) : (
              <img src="/svg/female.svg" className="w-4 shadow-sm" />
            )}
          </div>
          <div className="text-white text-xl font-semibold mt-1">
            {user.name}
          </div>
        </div>
        <div className="flex flex-row space-x-10">
          <div className="text-white text-sm font-semibold mt-1">
            Followers: {user.followers}
          </div>
          <div className="text-white text-sm font-semibold mt-1">
            Following: {user.following}
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
