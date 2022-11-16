import { notification } from "antd";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { loginWithEmail } from "../../utils/firebase/firebaseAuth";
import Input from "../../components/Auth/Input";
import AtSign from "../../components/Icons/AtSign";
import LockKeyhole from "../../components/Icons/LockKeyhole";
import Wrapper from "../../components/Auth/AuthPageWrapper";
import Button from "../../components/Auth/Button";
import In from "../../components/Icons/In";

const LoginPage = () => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      notification.error({ message: 'Thông tin tài khoản không chính xác!'});
      return;
    }
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      notification.error({ message: err.message });
    }
  }

  return (
    <Wrapper title="Đăng nhập vào tài khoản của bạn">
      <button className="relative rounded-md py-2 text-sm text-gray-800 bg-gray-100 dark:bg-slate-500 cursor-not-allowed" disabled>
        <span>Đăng nhập với Google</span>
      </button>
      <div className="relative mt-10 h-px bg-gray-300 dark:bg-light">
        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
          <span className="bg-white dark:bg-gray-700 px-4 text-xs text-gray-500 dark:text-light uppercase">Hoặc đăng nhập với Email và mật khẩu</span>
        </div>
      </div>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <Input type="email" inputRef={emailRef} placeholder="Địa chỉ E-Mail" label="Địa chỉ E-Mail" icon={<AtSign size={24} className="fill-gray-400" />} />
          <Input type="password" inputRef={passwordRef} placeholder="Mật khẩu" label="Mật khẩu" icon={<LockKeyhole size={24} className="fill-gray-400" />} />
          

          <div className="flex items-center mb-6 -mt-4">
            <div className="flex ml-auto">
              <Link to="/forgot" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Bạn khum nhớ mật khẩu?</Link>
            </div>
          </div>

          <div className="flex w-full">
            <Button icon={<In size={24} className="fill-light" />} text="Đăng nhập" type="submit" />
          </div>
        </form>
      </div>
    </Wrapper>
  )
};

export default LoginPage;