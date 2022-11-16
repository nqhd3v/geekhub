import { Link } from "react-router-dom";
import AuthPageWrapper from "../../components/Auth/AuthPageWrapper";
import Check from "../../components/Icons/Check";

const MailSent = () => {
  return (
    <AuthPageWrapper>
      <div className="w-full h-10 mb-6">
        <div className="h-10 w-10 rounded-full flex items-center justify-center m-auto bg-green-500">
          <Check size={28} className="fill-light" />
        </div>
      </div>
      <div className="text-center font-bold mb-2">
        <span className="block text-dark text-lg dark:text-light">Một email đã được gửi đến email của bạn!</span>
        <span className="block text-gray-400 dark:text-gray-300">Kiểm tra hộp thư Spam nếu không thấy email!</span>
      </div>
      <div className="flex items-center">
        <div className="flex m-auto">
          <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại đăng nhập?</Link>
        </div>
      </div>
    </AuthPageWrapper>
  )
};

export default MailSent;