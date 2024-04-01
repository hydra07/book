// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'mern-hello.firebaseapp.com',
  projectId: 'mern-hello',
  storageBucket: 'mern-hello.appspot.com',
  messagingSenderId: '1050241686964',
  appId: '1:1050241686964:web:d4d11b5754424f0415a6e1',
  measurementId: 'G-EEQKXQB9WR',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
// export default app;
