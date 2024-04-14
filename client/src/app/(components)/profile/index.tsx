'use client';
import ChangePassword from '@/app/(components)/profile/ChangePassword';
import EditProfile from '@/app/(components)/profile/EditProfile';
import ShowProfile from '@/app/(components)/profile/ShowProfile';
import User from '@/types/user';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default ({ user }: { user: User }) => {
  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>(user);
  useEffect(() => {
    setCurrentUser(user);
    console.log('user', user);
  }, [user]);
  return (
    <div className="pt-20">
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-3xl font-bold mb-10">Profile</h1>
        {!isEditUser && !isChangePassword && (
          <ShowProfile
            setIsEditUser={setIsEditUser}
            isEditUser={isEditUser}
            user={currentUser}
            setIsChangePassword={setIsChangePassword}
            isChangePassword={isChangePassword}
          />
        )}
        {isEditUser && (
          <EditProfile
            setIsEditUser={setIsEditUser}
            isEditUser={isEditUser}
            user={currentUser}
            setUser={setCurrentUser}
          />
        )}
        {isChangePassword && (
          <ChangePassword
            setIsChangePassword={setIsChangePassword}
            isChangePassword={isChangePassword}
            user={currentUser}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
