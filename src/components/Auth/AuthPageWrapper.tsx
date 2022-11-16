interface IAuthWrapper {
  children: React.ReactElement[] | React.ReactElement;
  title?: string;
}

const AuthPageWrapper: React.FC<IAuthWrapper> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 dark:bg-dark">
      <div className="flex flex-col bg-white dark:bg-gray-700 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        {title ? <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 dark:text-light mb-6">{title}</div> : null}
        {children}
      </div>
    </div>
  )
};

export default AuthPageWrapper;
