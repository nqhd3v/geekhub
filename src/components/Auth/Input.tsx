interface IAuthInput {
  inputRef: React.LegacyRef<HTMLInputElement>;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder: React.InputHTMLAttributes<HTMLInputElement>['placeholder'];
  icon: React.ReactNode;
  label: string;
}

const Input: React.FC<IAuthInput> = ({ label, icon, inputRef, type, placeholder }) => {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600 dark:text-slate-300">{label}:</label>
      <div className="relative">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          {icon}
        </div>

        <input ref={inputRef} type={type} className="bg-light dark:bg-gray-500 text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 text-dark dark:text-light" placeholder={placeholder} />
      </div>
    </div>
  )
}

export default Input;