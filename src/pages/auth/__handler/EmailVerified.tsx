import { notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthPageWrapper from "../../../components/Auth/AuthPageWrapper";
import Check from "../../../components/Icons/Check";
import { applyCode } from "../../../utils/firebase/firebaseAuth";
import LoadingPage from "../../LoadingPage";

const EmailVerified: React.FC<{ code: string }> = ({ code }) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [err, setErr] = useState<string | undefined>(undefined);

  const handleVerifyEmailWithCode = async (code: string) => {
    try {
      await applyCode(code);
      setIsVerified(true);
    } catch (err: any) {
      notification.error({ message: 'Xác thực email thất bại!' });
      console.error('Error when verifying email address:', err);
      setErr(err.code);
    }
  }

  useEffect(() => {
    console.log(code);
    if (code) {
      handleVerifyEmailWithCode(code);
    }
  }, [code]);

  if (err) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
        <span className="text-lg block mb-1">Lỗi rồi bạn tôi ơi! Thử lại sau nha!</span>
        <span className="text-sm block mb-5 font-bold text-gray-400 dark:text-gray-300 italic">[{err}]</span>
        <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại</Link>
      </div>
    )
  }

  if (isVerified) {
    return (
      <AuthPageWrapper>
        <div className="w-full h-10 mb-6">
          <div className="h-10 w-10 rounded-full flex items-center justify-center m-auto bg-green-500">
            <Check size={28} className="fill-light" />
          </div>
        </div>
        <div className="text-center font-bold mb-2">
          <span className="block text-dark text-lg dark:text-light">Xác thực email thành công!</span>
        </div>
        <div className="flex items-center">
          <div className="flex m-auto">
            <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại</Link>
          </div>
        </div>
      </AuthPageWrapper>
    );
  }

  return <LoadingPage />
};

export default EmailVerified;