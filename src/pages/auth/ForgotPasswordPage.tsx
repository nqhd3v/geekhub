import { notification } from "antd";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../utils/firebase/firebaseAuth";
import Input from "../../components/Auth/Input";
import AtSign from "../../components/Icons/AtSign";
import Button from "../../components/Auth/Button";
import In from "../../components/Icons/In";
import AuthPageWrapper from "../../components/Auth/AuthPageWrapper";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const emailRef: any = useRef();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    if (!email) {
      notification.error({ message: 'Email khum điền thì reset bằng niềm tin!?'});
      return;
    }
    try {
      await forgotPassword(email);
      navigate('/forgot/mail-sent');
    } catch (err: any) {
      notification.error({ message: err.message });
    }
  }

  return (
    <AuthPageWrapper title="Đặt lại mật khẩu của tôi">
      <form onSubmit={handleSubmit}>
        <Input type="email" inputRef={emailRef} placeholder="E-Mail Address" label="Địa chỉ email" icon={<AtSign size={24} className="fill-gray-400" />} />

        <div className="flex w-full">
          <Button icon={<In size={24} className="fill-light" />} text="Gửi mật khẩu vào email của tôi" type="submit" />
        </div>
        <div className="flex items-center mt-6">
          <div className="flex m-auto">
            <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Đăng nhập?</Link>
          </div>
        </div>
      </form>
    </AuthPageWrapper>
  )
};

export default ForgotPasswordPage;