// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import env from '../utils/validateEnv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: 'book-spring.firebaseapp.com',
  projectId: 'book-spring',
  storageBucket: 'book-spring.appspot.com',
  messagingSenderId: '579937971782',
  appId: '1:579937971782:web:aaee873330c2e25464e447',
  measurementId: 'G-VW3RET6V26',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
