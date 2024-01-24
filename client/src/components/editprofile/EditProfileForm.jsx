
import React, { useState } from 'react';
import ChangePasswordBox from './ChangePasswordBox';

const EditProfileForm = () => {
  const [name, setName] = useState('Khang');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSave = () => {
  
    console.log('Saving profile:', { name, avatar, password, phone, gender });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>

     
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
          Upload Avatar
        </label>
        <input
          type="file"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Change Password
        </label>
        <button
          onClick={() => setShowChangePassword(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
      </div>

    
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSave}
      >
        Save
      </button>

      
      {showChangePassword && <ChangePasswordBox onClose={() => setShowChangePassword(false)} />}
    </div>
  );
};

export default EditProfileForm;
