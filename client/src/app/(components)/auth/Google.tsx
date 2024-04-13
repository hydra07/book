import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'react-toastify';
// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default () => {
  const handleGoogleClick = async () => {
    try {
      const res = await signIn('google', {
        // callbackUrl: '/',
        redirect: false,
      });
      toast.error(res?.error);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="border border-white py-2 px-4 rounded-full text-white whitespace-nowrap"
      onClick={handleGoogleClick}
    >
      <span className="flex">
        <Image
          src="/svg/google.svg"
          alt=""
          width={'20'}
          height={'20'}
          className="mr-3"
        />
        Google
      </span>
    </button>
  );
};
