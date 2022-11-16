import { notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { confirmPwdReset, verifyPwdResetCode } from "../../../utils/firebase/firebaseAuth";
import Input from "../../../components/Auth/Input";
import Button from "../../../components/Auth/Button";
import In from "../../../components/Icons/In";
import AuthPageWrapper from "../../../components/Auth/AuthPageWrapper";
import LoadingPage from "../../LoadingPage";
import Check from "../../../components/Icons/Check";
import LockKeyhole from "../../../components/Icons/LockKeyhole";

const ResetPassword: React.FC<{ code: string }> = ({ code }) => {
  const [err, setErr] = useState<string | undefined>(undefined);
  const [accResetEmail, setAccResetEmail] = useState<string | undefined>(undefined);
  const [isReset, setIsReset] = useState<boolean>(false);

  const passwordRef: any = useRef();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const password = passwordRef.current?.value;
    if (!password) {
      notification.error({ message: 'Mật khẩu khum điền thì reset bằng niềm tin!?'});
      return;
    }
    try {
      await confirmPwdReset(code, password);
      setIsReset(true);
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

  if (isReset) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
        <div className="w-full h-10 mb-6">
          <div className="h-10 w-10 rounded-full flex items-center justify-center m-auto bg-green-500">
            <Check size={28} className="fill-light" />
          </div>
        </div>
        <span className="text-lg block mb-1">Reset xong goy đó!</span>
        <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại đăng nhập hoy!</Link>
      </div>
    )
  }

  if (accResetEmail) {
    return (
      <AuthPageWrapper title="Đặt lại mật khẩu của tôi">
        <form onSubmit={handleSubmit}>
          <Input type="password" inputRef={passwordRef} placeholder="Mật khẩu mới" label="Mật khẩu mới" icon={<LockKeyhole size={24} className="fill-gray-400" />} />

          <div className="flex w-full">
            <Button icon={<In size={24} className="fill-light" />} text="Cập nhật mật khẩu" type="submit" />
          </div>
        </form>
      </AuthPageWrapper>
    )
  }
   
  return <LoadingPage />
};

export default ResetPassword;