import { notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword, verifyPwdResetCode } from "../../../utils/firebase/firebaseAuth";
import Input from "../../../components/Auth/Input";
import AtSign from "../../../components/Icons/AtSign";
import Button from "../../../components/Auth/Button";
import In from "../../../components/Icons/In";
import AuthPageWrapper from "../../../components/Auth/AuthPageWrapper";
import LoadingPage from "../../LoadingPage";

const ResetPassword: React.FC<{ code: string }> = ({ code }) => {
  const [err, setErr] = useState<string | undefined>(undefined);
  const [accResetEmail, setAccResetEmail] = useState<string | undefined>(undefined);
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
    } catch (err: any) {
      notification.error({ message: err.message });
    }
  }

  const handleCheckActionCode = async (code: string) => {
    try {
      const email = await verifyPwdResetCode(code);
      setAccResetEmail(email);
    } catch (err: any) {
      console.error('Error when checking action-code:', err);
      setErr(err.code);
    }
  }

  useEffect(() => {
    if (code) {
      handleCheckActionCode(code);
    }
  }, [code])

  if (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
        <span className="text-lg block mb-1">Lỗi rồi bạn tôi ơi! Thử lại sau nha!</span>
        <span className="text-sm block mb-5 font-bold text-gray-400 dark:text-gray-300 italic">[{err}]</span>
        <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại</Link>
      </div>
    )
  }

  if (accResetEmail) {
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
  }
   
  return <LoadingPage />
};

export default ResetPassword;