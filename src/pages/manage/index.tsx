import { Outlet, useNavigate } from "react-router";
import { useAuthState } from 'react-firebase-hooks/auth'
import DarkModeToggle from "../../components/DarkModeToggle";
import Github from "../../components/Icons/Github";
import Out from "../../components/Icons/Out";
import { logout } from "../../utils/firebase/firebaseAuth";
import { firebaseAuth } from "../../utils/firebase/firebase";
import LoadingPage from "../LoadingPage";
import { useEffect } from "react";

const ManageWrapper = () => {
  const [user, isLoading] = useAuthState(firebaseAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!user]);

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
        Bạn cần đăng nhập để tiếp tục!
      </div>
    )
  }

  return (
    <div className="bg-light dark:bg-dark">
      <div className="fixed w-15 h-screen top-0 left-0 border-r flex flex-col justify-between items-center">
        <div className="relative"></div>
        <div className="relative w-15 grid columns-1 gap-y-4 py-5">
          <div className="w-8 h-8 m-auto cursor-pointer" onClick={logout}>
            <Out size={32} />
          </div>
          <a target="_blank" href="https://google.com" className="flex items-center justify-center" rel="noreferrer">
            <Github size={32} />
          </a>
          <DarkModeToggle />
        </div>
      </div>
      <div className="relative w-main min-h-screen ml-15">
        <Outlet />
      </div>
    </div>
  );
};

export default ManageWrapper;