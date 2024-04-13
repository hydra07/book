import { Input } from '@material-tailwind/react';
import { signIn } from 'next-auth/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { ShowDiaLog } from '../header/AuthButton';
import Google from './Google';
// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default ({ setShowSignInDialog, setShowSignUpDialog }: ShowDiaLog) => {
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
  // const dispatch = useDispatch();

  const isFormFilled = form.email && form.password && form.repassword;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password !== form.repassword) {
      // console.log('not match');
      toast.error('Mật khẩu không trùng khớp');
      return;
    } else {
      const { repassword, ...rest } = form;
      setFromData(rest);
      await signIn('register', {
        name: form.name,
        email: form.email,
        password: form.password,
        // callbackUrl: '/',
        redirect: false,
      });
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
            <Input
              className="h-14"
              size="lg"
              color="white"
              id="name"
              type="text"
              label="Họ và tên"
              required
              autoComplete="off"
              value={form.name}
              onChange={(event) => handleChange(event)}
              crossOrigin={null}
            />
          </div>
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
              crossOrigin={null}
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
              crossOrigin={null}
            />
          </div>
          <div className="mb-4">
            <Input
              size="lg"
              color="white"
              id="repassword"
              type="password"
              label="Nhập lại mật khẩu"
              required
              autoComplete="off"
              value={form.repassword}
              onChange={(event) => handleChange(event)}
              crossOrigin={null}
            />
          </div>

          <button
            // "text-white py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full"
            className={`py-2 rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap w-full ${
              isFormFilled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
            }`}
          >
            <span>Đăng ký</span>
          </button>
          <p className="text-white pt-4">Hoặc đăng ký với</p>
        </form>
        <div className="space-x-3 py-5">
          {/* <button className="border border-white py-2 px-4 rounded-full text-white whitespace-nowrap ">
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
          </button> */}
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
