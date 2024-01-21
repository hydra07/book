import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
const AuthButton = () => {
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  const handleOpenSignUpDialog = () => {
    setShowSignUpDialog(true);
  };

  const handleOpenSignInDialog = () => {
    setShowSignInDialog(true);
  };

  const handleCloseDialog = () => {
    setShowSignUpDialog(false);
    setShowSignInDialog(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 h-[42px]">
        <Button
          className="border border-white py-2 px-4 rounded-full text-white whitespace-nowrap"
          onClick={handleOpenSignUpDialog}
        >
          <span>Đăng ký</span>
        </Button>

        <Button
          className="bg-green-600 border border-white py-2 px-4 rounded-full text-white whitespace-nowrap"
          onClick={handleOpenSignInDialog}
        >
          <span>Đăng nhập</span>
        </Button>
      </div>

      {showSignUpDialog && (
        <div role="dialog" className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 "
              aria-hidden="true"
              onClick={handleCloseDialog}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              {/* &#8203; */}
            </span>
            <div className="border border-gray-400 bg-opacity-80 backdrop-blur-lg bg-black inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <button
                className="p-3 absolute top-4 right-4"
                onClick={handleCloseDialog}
              >
                <img src="/svg/close.svg" className="w-6 h-6" />
              </button>
              <div className="mx-10 my-5">
                <SignUp
                  setShowSignInDialog={setShowSignInDialog}
                  setShowSignUpDialog={setShowSignUpDialog}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showSignInDialog && (
        <div role="dialog" className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 "
              aria-hidden="true"
              onClick={handleCloseDialog}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              {/* &#8203; */}
            </span>
            <div className="border border-gray-400 bg-opacity-80 backdrop-blur-lg bg-black inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <button
                className="p-3 absolute top-4 right-4"
                onClick={handleCloseDialog}
              >
                <img src="/svg/close.svg" className="w-6 h-6" />
              </button>
              <div className="mx-10 my-5">
                <SignIn
                  setShowSignInDialog={setShowSignInDialog}
                  setShowSignUpDialog={setShowSignUpDialog}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
