import { Link, useSearchParams } from "react-router-dom";
import { FIREBASE_EMAIL_ACTION_MODE, FIREBASE_EMAIL_ACTION_MODES } from "../../../utils/firebase/firebaseAuth";
import EmailRecovered from "./EmailRecovered";
import EmailVerified from "./EmailVerified";
import ResetPassword from "./ResetPassword";

const HandlerContent: React.FC<{ mode: FIREBASE_EMAIL_ACTION_MODE, code: string }> = ({ mode, code }) => {
  if (mode === "recoveryEmail") {
    return <EmailRecovered code={code} />;
  }
  if (mode === "resetPassword") {
    return <ResetPassword code={code} />;
  }
  if (mode === "verifyEmail") {
    return <EmailVerified code={code} />;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
      <span className="text-lg block mb-1">Ú oà! Không biết đang làm gì lun! Thử lại sau nha!</span>
      <span className="text-sm block mb-5 font-bold text-gray-400 dark:text-gray-300 italic">error-invalid-mode</span>
      <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại</Link>
    </div>
  );
}

const Handler = () => {
  const [searchParams] = useSearchParams();
  const mode: any = searchParams.get('mode');
  const actionCode: any = searchParams.get('oobCode');

  if (!FIREBASE_EMAIL_ACTION_MODES.includes(mode)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
        <span className="text-lg block mb-1">Ú oà! Không biết đang làm gì lun! Thử lại sau nha!</span>
        <span className="text-sm block mb-5 font-bold text-gray-400 dark:text-gray-300 italic">error-invalid-mode</span>
        <Link to="/" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-50">Quay lại</Link>
      </div>
    )
  }
  return (
    <HandlerContent mode={mode} code={actionCode} />
  );
}

export default Handler;