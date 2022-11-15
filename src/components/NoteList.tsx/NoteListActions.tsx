import { Tooltip, TooltipProps } from "antd";
import Edit from "../Icons/Edit";
import Loading from "../Icons/Loading"
import Rotate from "../Icons/Rotate";
import XMark from "../Icons/XMark";

const Action: React.FC<{
  icon: React.ReactNode; onClick: () => void; isLoading?: boolean
  showTitle?: TooltipProps['title'];
}> = ({
  icon, onClick, isLoading, showTitle
}) => {
  if (showTitle) {
    return (
      <Tooltip title={showTitle}>
        <button
          className={
            "w-6 h-6 flex items-center justify-center rounded-md " +
            "group enabled:hover:bg-gray-300/50 dark:enabled:hover:bg-gray-300/20 duration-300 disabled:cursor-not-allowed "
          }
          disabled={isLoading}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
        >
          {isLoading ? <Loading size={16} className="fill-dark dark:fill-light" /> : icon}
        </button>
      </Tooltip>
    )
  }
  return (
    <button
      className={
        "w-6 h-6 flex items-center justify-center rounded-md " +
        "group enabled:hover:bg-gray-300/50 dark:enabled:hover:bg-gray-300/20 duration-300 disabled:cursor-not-allowed "
      }
      disabled={isLoading}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      {isLoading ? <Loading size={16} className="fill-dark dark:fill-light" /> : icon}
    </button>
  )
}

interface INoteListActions {
  onEdit?: () => Promise<void> | void;
  isDeleting?: boolean;
  onDelete?: () => Promise<void> | void;
  isRemoved: boolean;
}
const NoteListActions: React.FC<INoteListActions> = ({
  onEdit,
  isDeleting,
  onDelete,
  isRemoved,
}) => {
  if (isRemoved) {
    return (
      <div className="flex items-center space-x-2">
        <Action
          showTitle="Khôi phục"
          icon={<Rotate size={16} />}
          onClick={() => onEdit?.()}
        />
      </div>
    )
  }
  return (
    <div className="flex items-center space-x-2">
      <Action
        showTitle="Chỉnh sửa"
        icon={<Edit size={16} />}
        onClick={() => onEdit?.()}
      />
      <Action
        showTitle="Xoá"
        icon={<XMark size={16} />}
        onClick={() => onDelete?.()}
        isLoading={isDeleting}
      />
    </div>
  )
};

export default NoteListActions;