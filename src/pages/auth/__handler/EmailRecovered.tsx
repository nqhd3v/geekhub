import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthPageWrapper from "../../../components/Auth/AuthPageWrapper";
import Check from "../../../components/Icons/Check";
import { applyCode } from "../../../utils/firebase/firebaseAuth";
import LoadingPage from "../../LoadingPage";

const EmailRecovered: React.FC<{ code: string }> = ({ code }) => {
  const [isRecovered, setIsRecovered] = useState<boolean>(false);
  const [err, setErr] = useState<string | undefined>(undefined);

  const handleRecoveryEmailWithCode = async (code: string) => {
    try {
      // Get email recovery from info;
      // const info = await checkCode(code);
      await applyCode(code);
      setIsRecovered(true)
    } catch (err: any) {
      notification.error({ message: 'Khôi phục email thất bại!' });
      console.error('Error when recovering email:', err);
      setErr(err.code);
    }
  }

  useEffect(() => {
    if (code) {
      handleRecoveryEmailWithCode(code);
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

  if (isRecovered) {
    return (
      <AuthPageWrapper>
        <div className="w-full h-10 mb-6">
          <div className="h-10 w-10 rounded-full flex items-center justify-center m-auto bg-green-500">
            <Check size={28} className="fill-light" />
          </div>
        </div>
        <div className="text-center font-bold mb-2">
          <span className="block text-dark text-lg dark:text-light">Khôi phục email thành công!</span>
        </div>
        <div className="flex items-center">
          <div className="flex m-auto">
            <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại</Link>
          </div>
        </div>
      </AuthPageWrapper>
    )
  }
  return <LoadingPage />
};

export default EmailRecovered;