interface IAuthButton {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon: React.ReactNode;
  text: string;
}

const Button: React.FC<IAuthButton> = ({ type, icon, text }) => {
  return (
    <button type={type} className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
      <span className="mr-2 uppercase font-bold">{text}</span>
      <span>
        {icon}
      </span>
    </button>
  )
};

export default Button;