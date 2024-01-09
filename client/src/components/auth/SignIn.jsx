import React, { useState } from 'react';
const SignIn = ({ setShowSignUpDialog, setShowSignInDialog }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const isFormFilled = form.email && form.password;
  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    console.log('submit');
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

          <button
            // "text-white py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full"
            className={`py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full ${
              isFormFilled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
            }`}
          >
            <span>Đăng ký</span>
          </button>
          <p className="text-white">Hoặc đăng nhập với</p>
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
          <button className="border border-white py-2 px-4 rounded-full text-white whitespace-nowrap">
            <span className="flex ">
              <img
                src="/svg/google.svg"
                alt=""
                width={'20px'}
                height={'20px'}
              />
              Google
            </span>
          </button>
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
