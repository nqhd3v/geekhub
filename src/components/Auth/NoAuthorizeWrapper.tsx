import { Outlet, useNavigate } from "react-router";
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from "../../utils/firebase/firebase";
import LoadingPage from "../../pages/LoadingPage";
import { useEffect } from "react";

const NoAuthorizeWrapper = () => {
  const [user, isLoading] = useAuthState(firebaseAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/manage');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!user]);

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
        Bạn đã đăng nhập!
      </div>
    )
  }

  return (
    <Outlet />
  );
};

export default NoAuthorizeWrapper;