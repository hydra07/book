import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/auth';
import Google from './Google';

const SingUp = ({ setShowSignInDialog, setShowSignUpDialog }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
  });
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const isFormFilled = form.email && form.password && form.repassword;
  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.repassword) {
      console.log('not match');
      return;
    } else {
      const { repassword, ...rest } = form;
      setFromData(rest);
      await console.log(dispatch(register(formData)));
    }
  };

  const handleOpenSignInDialog = () => {
    setShowSignUpDialog(false);
    setShowSignInDialog(true);
  };

  return (
    <div className="w-full h-full relative text-center p-7-5 pb-0">
      <div className="mb-6">
        <h1 className="text-2xl mb-2 text-white">Đăng ký tài khoản</h1>
        <p className="text-sm-15-19 text-white">
          Đăng ký tài khoản để sử dụng dịch vụ
        </p>
      </div>

      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="mb-4">
            <div className="flex flex-col">
              <div className="relative w-full h-14 border rounded-xl border-white">
                <input
                  id="name"
                  type="text"
                  className="text-white bg-transparent w-full h-full top-0 left-0 absolute pt-5 outline-none px-3 text-base"
                  required
                  autoComplete="off"
                  value={form.name}
                  onChange={(event) => handleChange(event)}
                />
                <label
                  htmlFor="name"
                  className="absolute select-none pointer-events-none left-3 block transition-all text-white -translate-y-1/2 z-3 top-[10px] translate-x-1 text-sm focus-visible:bg-red-300"
                >
                  Họ và tên
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-col">
              <div className="relative w-full h-14 border rounded-xl border-white">
                <input
                  id="email"
                  type="text"
                  className="text-white bg-transparent w-full h-full top-0 left-0 absolute pt-5 outline-none px-3 text-base"
                  required
                  autoComplete="off"
                  value={form.email}
                  onChange={(event) => handleChange(event)}
                />
                <label
                  htmlFor="email"
                  className="absolute select-none pointer-events-none left-3 block transition-all text-white -translate-y-1/2 z-3 top-[10px] translate-x-1 text-sm focus-visible:bg-red-300"
                >
                  Email
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-col">
              <div className="relative w-full h-14 border rounded-xl border-white">
                <input
                  id="password"
                  type="password"
                  className="text-white bg-transparent w-full h-full top-0 left-0 absolute pt-5 outline-none px-3 text-base "
                  autoComplete="off"
                  required
                  value={form.password}
                  onChange={(event) => handleChange(event)}
                />
                <label
                  htmlFor="password"
                  className="absolute select-none pointer-events-none left-3 block transition-all text-white -translate-y-1/2 z-3 top-[10px] translate-x-1 text-sm focus-visible:bg-red-300"
                >
                  Mật khẩu
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-col">
              <div className="relative w-full h-14 border rounded-xl border-white">
                <input
                  id="repassword"
                  type="password"
                  className="text-white bg-transparent w-full h-full top-0 left-0 absolute pt-5 outline-none px-3 text-base "
                  autoComplete="off"
                  required
                  value={form.repassword}
                  onChange={(event) => handleChange(event)}
                />
                <label
                  htmlFor="repassword"
                  className="absolute select-none pointer-events-none left-3 block transition-all text-white -translate-y-1/2 z-3 top-[10px] translate-x-1 text-sm focus-visible:bg-red-300"
                >
                  Nhập lại mật khẩu
                </label>
              </div>
            </div>
          </div>

          <button
            // "text-white py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full"
            className={`py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full ${
              isFormFilled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
            }`}
          >
            <span>Đăng ký</span>
          </button>
          <p className="text-white">Hoặc đăng ký với</p>
        </form>
        <div className="space-x-3 py-5">
          <button className="border border-white py-2 px-4 rounded-full text-white whitespace-nowrap ">
            <span className="flex ">
              <img
                src="/svg/facebook.svg"
                alt=""
                width={'20px'}
                height={'20px'}
                className="mr-3"
              />
              Facebook
            </span>
          </button>
          <Google />
        </div>
        <div className="py-4 w-full mt-7-5 border-t border-white-overlay text-center rounded-bl-[20px] rounded-br-[20px]">
          <p className="text-white">
            Bạn đã có tài khoản?{' '}
            <button className="text-green-400" onClick={handleOpenSignInDialog}>
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
