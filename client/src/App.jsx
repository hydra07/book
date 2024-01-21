import { Button } from '@material-tailwind/react';
import './App.css';
import Header from './components/header';
import React from 'react';
import Fanpage from './components/profile/Fanpage';
// function App() {
//   return (
//     <div className="w-max-[1280px] content-center h-[3000px]">
//       <Header />
//       <div className="w-max-[1280px] h-[1400px] bg-white"></div>
//       <Button className="mt-6" fullWidth>
//         sign up
//       </Button>
//       <div className="w-max-[1280px] h-[1400px] bg-black"></div>
//     </div>
//   );
// }
function App() {


  const books = [
    { id: 1, title: 'Book 1', content: '' },
    { id: 2, title: 'Book 2', content: '' },
    // Add more stories as needed
  ];

  const comments = [
    { id: 1, title: 'User 1', text: 'D*tme tuyệt vời!' },
    { id: 2, title: 'User 2', text: 'Hay!' },
    // Add more comments as needed
  ];

  return (
    <div className="bg-gray-700">
      <div className="w-max-[1280px] content-center h-[100px]">
      <Header />
      </div>
      
      <Fanpage user books={books} comments={comments} />
      
    </div>
  );
};

export default App;
