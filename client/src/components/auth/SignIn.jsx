import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth';
import Google from '../auth/Google';
const SignIn = ({ setShowSignUpDialog, setShowSignInDialog }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const isFormFilled = form.email && form.password;
  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(form));
  };
  const handleOpenSignUpDialog = () => {
    setShowSignUpDialog(true);
    setShowSignInDialog(false);
  };

  return (
    <div className="w-full h-full relative text-center p-7-5 pb-0">
      <div className="mb-6">
        <h1 className="text-2xl mb-2 text-white">Đăng nhập</h1>
        {/* <p className="text-sm-15-19 text-white">
          Đăng ký tài khoản để sử dụng dịch vụ
        </p> */}
      </div>

      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-4">
            <Input
              className="h-14 mb-4"
              size="lg"
              color="white"
              id="email"
              type="text"
              label="Email"
              required
              autoComplete="off"
              value={form.email}
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div className="mb-4">
            <Input
              className="h-14 mb-4"
              size="lg"
              color="white"
              id="password"
              type="password"
              label="Nhập mật khẩu"
              required
              autoComplete="off"
              value={form.password}
              onChange={(event) => handleChange(event)}
            />
          </div>

          <button
            // "text-white py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full"
            className={`py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full ${
              isFormFilled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
            }`}
          >
            <span>Đăng nhập</span>
          </button>
          <p className="text-white pt-4">Hoặc đăng nhập với</p>
        </form>
        <div className="space-x-3 py-5">
          <button className="border border-white py-2 px-4 rounded-full text-white whitespace-nowrap ">
            <span className="flex ">
              <img
                src="/svg/facebook.svg"
                alt=""
                width={'20px'}
                height={'20px'}
              />
              Facebook
            </span>
          </button>
          <Google />
        </div>
        <div className="py-4 w-full mt-7-5 border-t border-white-overlay text-center rounded-bl-[20px] rounded-br-[20px]">
          <p className="text-white">
            Bạn đã chưa có tài khoản?{' '}
            <button className="text-green-400" onClick={handleOpenSignUpDialog}>
              Đăng ký
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
