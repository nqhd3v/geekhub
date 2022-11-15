import { notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { fsUpdate } from "../../utils/firebase/firestore";

interface IBranchItem {
  data: any;
  isSelected: 'selected' | undefined;
  onSelect: (key: string) => Promise<void> | void;
  onRefreshData?: () => Promise<void> | void;
}

const BranchItem: React.FC<IBranchItem> = ({ onSelect, onRefreshData, isSelected, data }) => {
  const inputRef: any = useRef()
  const [isUpdating, setUpdatingState] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdating && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = data?.name;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

  const handleUpdate = async (name: string) => {
    try {
      await fsUpdate(
        {
          name,
        },
        'branch',
        data._id
      );
      onRefreshData?.();
    } catch (err) {
      console.error('Error when add new branch', err);
      notification.error({
        message: 'Cập nhật chi nhánh thất bại!',
      });
    }
  }
  const handleAccept = async () => {
    setUpdatingState(false);
    if (!inputRef.current) {
      return;
    }
    const newValue = inputRef.current?.value;
    if (newValue && newValue.trim() !== "") {
      await handleUpdate(newValue.trim());
    }
    inputRef.current.value = "";
  }
  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setUpdatingState(false);
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

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "click") {
      // Left
      onSelect?.(data._id);
      return false;
    }
    // Right
    setUpdatingState(true);
    return false;
  }

  return (
    <div className="h-full group flex items-center" data-adding={isUpdating}>
      <div className="hidden p-1 group-data-[adding='true']:block">
        <input
          className="focus:outline-none border rounded-sm px-0.5 bg-light dark:bg-gray-600 dark:text-light"
          onBlur={handleAccept}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
      </div>
      <div
        data-state={isSelected}
        className={
          "group-data-[adding='true']:hidden " +
          "relative h-full flex items-center px-2 font-bold cursor-pointer text-dark/70 dark:text-light/50 " +
          "before:content-[''] before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-gray-300 " +
          "after:content-[''] after:absolute after:h-1 after:w-full after:-top-[1px] after:left-0 " +
          "data-[state='selected']:after:bg-blue-400 dark:data-[state='selected']:after:bg-light data-[state='selected']:text-dark dark:data-[state='selected']:text-light "
        }
        onClick={handleClick}
        onContextMenu={handleClick}
      >
        {data.name || ''}
      </div>
    </div>
  );
};

export default BranchItem;