
// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import EditProfileForm from './EditProfileForm';

// const Home = () => {
//   return (
//     <div className="text-center">
//       <h1 className="text-4xl font-semibold mb-8">Welcome to My Profile</h1>
//       <Link to="/edit-profile" className="text-blue-500 hover:underline">
//         Edit Profile
//       </Link>
//     </div>
//   );
// };

// const EditProfile = () => {
//   return (
//     <Router>
//       <div className="bg-gray-200 min-h-screen flex items-center justify-center">
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/edit-profile" component={EditProfileForm} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default EditProfile;



import React, { useState } from 'react';
import EditProfileForm from '../components/editprofile/EditProfileForm';


const Home = ({ setCurrentPage }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-semibold mb-8">Welcome to My Profile</h1>
      <button onClick={() => setCurrentPage('edit-profile')} className="text-blue-500 hover:underline">
        Edit Profile
      </button>
    </div>
  );
};

const EditProfile = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'edit-profile' && <EditProfileForm setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default EditProfile;
