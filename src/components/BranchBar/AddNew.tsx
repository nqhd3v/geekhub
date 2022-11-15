import { notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { fsAdd } from "../../utils/firebase/firestore";
import Plus from "../Icons/Plus";

interface IAddNew {
  onRefreshData?: () => Promise<void> | void;
}

const AddNew: React.FC<IAddNew> = ({ onRefreshData }) => {
  const inputRef: any = useRef()
  const [isAdding, setAddingState] = useState<boolean>(false);

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  const handleAdd = async (name: string) => {
    try {
      await fsAdd(
        {
          name,
        },
        'branch',
      );
      onRefreshData?.();
    } catch (err) {
      console.error('Error when add new branch', err);
      notification.error({
        message: 'Thêm chi nhánh thất bại!',
      });
    }
  }
  const handleAccept = async () => {
    if (!inputRef.current) {
      setAddingState(false);
      return;
    }
    const newValue = inputRef.current?.value;
    if (newValue && newValue.trim() !== "") {
      await handleAdd(newValue.trim());
    }
    inputRef.current.value = "";
    setAddingState(false);
  }
  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setAddingState(false);
  }
  const handleKeyUp = async (e: any) => {
    if (e.code === "Escape") {
      handleCancel();
      return;
    }
    if (e.code === "Enter") {
      await handleAccept();
      return;
    }
  }

  return (
    <div className="h-full group flex items-center" data-adding={isAdding}>
      <div className="hidden p-1 group-data-[adding='true']:block">
        <input
          className="focus:outline-none border rounded-sm px-0.5 bg-light dark:bg-gray-600 dark:text-light"
          onBlur={handleAccept}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
      </div>
      <div
        className={
          "w-6 h-6  ml-1 rounded-md flex justify-center items-center cursor-pointer group-data-[adding='true']:hidden " +
          "hover:bg-gray-100 dark:hover:bg-gray-500"
        }
        onClick={() => setAddingState(() => true)}
      >
        <Plus size={16} className="fill-dark dark:fill-light" />
      </div>
    </div>
  );
};

export default AddNew;