import React from "react";
import XMark from "./Icons/XMark";

interface IModal {
  visible?: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactElement;
  footer?: React.ReactElement;
}

const Modal: React.FC<IModal> = ({ title, onClose, visible, children, footer }) => {
  return (
    <div
      aria-hidden={!visible}
      className={
        "aria-hidden:hidden overflow-x-hidden overflow-y-auto fixed h-screen flex justify-center items-center md:inset-0 z-50 " +
        "top-0 left-0 right-0 " +
        "backdrop-blur-sm bg-neutral-800/70 "
      }
    >
      <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
          <div className="flex items-start justify-between px-5 py-3 border-b rounded-t dark:border-gray-600">
            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
              {title}
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => onClose?.()}>
              <XMark size={20} className="fill-dark dark:fill-light" />
            </button>
          </div>
          <div>
            {children}
          </div>
          {footer ? <div>{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}

export default Modal;