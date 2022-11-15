import React, { useState } from "react";
import Tag from "./Tag";

type TTagItem = { text: string, key: string, _selected?: boolean };
interface ITagList {
  items: TTagItem[];
  onRemove?: (key: string) => Promise<void> | void;
  createContent?: string;
  onCreate?: (text: string) => Promise<void> | void;
}

const TagList: React.FC<ITagList> = ({ items, onRemove, onCreate, createContent }) => {
  const [tagsSelected, setTagsSelected] = useState<string[]>(items.filter(item => !!item._selected).map(item => item.key));
  const [isCreateNew, setCreateNew] = useState<boolean>(false);
  const [isCreatingNew, setCreatingNew] = useState<boolean>(false);
  const [newTagContent, setNewTagContent] = useState<string>('');

  const handleRemove = (key: string) => {
    setTagsSelected(tagsSelected.filter(keySelected => keySelected !== key));
    onRemove?.(key);
  }
  const handleCreate = async () => {
    setCreatingNew(true);
    await onCreate?.(newTagContent);
    setCreatingNew(false);
    setCreateNew(false);
    setNewTagContent('');
  }

  const renderCreateNew = () => {
    if (isCreateNew) {
      return (
        <div className="w-fit px-3 py-2 rounded-sm bg-blue-300 dark:bg-blue-800 flex items-center">
          <input
            className="outline-none autofill:bg-transparent px-1 mr-2"
            value={newTagContent}
            onChange={e => { e.preventDefault(); e.stopPropagation(); setNewTagContent(e.target.value);}}
            disabled={isCreatingNew}
          />
          {
            !isCreatingNew ? (
              <>
                <button
                  className={
                    "rounded-sm text-light duration-300 mr-1 px-3 font-bold " +
                    (newTagContent.trim() === "" ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 ")
                  }
                  onClick={() => handleCreate()}
                  disabled={newTagContent.trim() === ""}
                >
                  Thêm
                </button>
                <button
                  className={
                    "rounded-sm bg-red-400 text-light px-3 font-bold"
                  }
                  onClick={() => setCreateNew(false)}
                >
                  Huỷ
                </button>
              </>
            ) : (
              <span className="text-light ">Đang tạo...</span>
            )
          }
        </div>
      )
    }
    return (
      <button
        className="rounded-sm bg-blue-400 text-light font-bold px-3 py-1"
        onClick={() => setCreateNew(true)}
      >
        Thêm mới
      </button>
    )
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-x-2">
        {items.map(item => (
          <Tag
            text={item.text}
            key={item.key}
            selected={tagsSelected.includes(item.key)}
            onSelect={() => setTagsSelected([...tagsSelected, item.key])}
            onRemove={() => handleRemove(item.key)}
            removable
          />
        ))}
      </div>
      {renderCreateNew()}
    </div>
  );
};

export default TagList;