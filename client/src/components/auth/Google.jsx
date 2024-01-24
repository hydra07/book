import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import app from '../../configs/firebase';
import { google } from '../../store/auth';
const Google = () => {
  const dispatch = useDispatch();
  const hanldeGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const data = {
        name: result.user.displayName,
        email: result.user.email,
        phone: result.user.phoneNumber,
        avatar: result.user.photoURL,
      };
      dispatch(google(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="border border-white py-2 px-4 rounded-full text-white whitespace-nowrap"
      onClick={hanldeGoogleClick}
    >
      <span className="flex ">
        <img src="/svg/google.svg" alt="" width={'20px'} height={'20px'} />
        Google
      </span>
    </button>
  );
};
export default Google;
