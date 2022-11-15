import { Outlet } from "react-router";
// import ConfigurationToggle from "../../components/ConfigurationToggle";
import DarkModeToggle from "../../components/DarkModeToggle";
import Github from "../../components/Icons/Github";

const ManageWrapper = () => {
  return (
    <div className="bg-light dark:bg-dark">
      <div className="fixed w-15 h-screen top-0 left-0 border-r flex flex-col justify-between items-center">
        <div className="relative"></div>
        <div className="relative w-15 grid columns-1 gap-y-4 py-5">
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