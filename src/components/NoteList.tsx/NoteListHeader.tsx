import { Input, Select } from "antd";
import React from "react";
import { TNoteView } from "../../utils/models/materialNotes";

interface INoteListHeader {
  currentView: TNoteView;
  onChangeView: (view: TNoteView) => void;
  onOpenAddNew: () => void;
}

const NoteListHeader: React.FC<INoteListHeader> = ({ currentView, onChangeView, onOpenAddNew }) => {
  return (
    <div className="px-4 py-2 flex items-center justify-between">
      <button
        className={
          "px-2 py-1 rounded-md duration-300 " +
          "bg-blue-500 hover:bg-blue-600 dark:bg-slate-50 dark:hover:bg-slate-300 text-light dark:text-dark "
        }
        onClick={onOpenAddNew}
      >
        Tạo
      </button>
      <div className="flex items-center">
        <Input.Group>
          <div className="flex items-center">
            <div className="h-8 px-1 flex items-center">Đang hiển thị</div>
            <Select
              options={[
                { label: 'mặc định', value: 'default' },
                { label: 'đã xoá', value: 'removed' },
                { label: 'đã hết hạn', value: 'expired' },
                { label: 'đã hết hạn (chưa xoá)', value: 'expiredNotRemove' },
                { label: 'hết hạn trong 7 ngày', value: 'lte7d' },
                { label: 'hết hạn hôm nay', value: 'today' },
                { label: 'tất cả', value: 'all' },
              ]}
              onChange={v => onChangeView(v)}
              className="w-44"
              value={currentView}
            />
          </div>
        </Input.Group>
      </div>
    </div>
  );
};

export default NoteListHeader;