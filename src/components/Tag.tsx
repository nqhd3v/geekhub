import React, { MouseEventHandler } from "react";
import Loading from "./Icons/Loading";
import XMark from "./Icons/XMark";

interface ITag {
  text: string;
  selected?: boolean;
  onSelect?: () => void;
  removable?: boolean;
  onRemove?: () => void | Promise<void>;
  removing?: boolean;
}

const Tag: React.FC<ITag> = ({ text, selected, onSelect, removable, onRemove, removing }) => {
  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove?.();
  }
  const handleSelect: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect?.();
  }

  const removeIcon = removing ? <Loading size={14} className="fill-dark dark:fill-light" /> : <XMark size={14} className="fill-dark dark:fill-light" />;

  return (
    <div
      className={
        "relative w-fit pl-1 pr-6 py-1 rounded-sm " +
        "border border-dashed " +
        (selected ? 'bg-blue-500 dark:bg-blue-900 ' : 'border-blue-500 dark:border-blue-900 ') +
        (!!onSelect ? 'cursor-pointer ' : '')
      }
      onClick={handleSelect}
    >
      <span className="text-dark dark:text-light font-bold pointer-events-none">{text}</span>
      {removable ? (
        <div className="absolute top-1/2 right-1 -translate-y-1/2">
          <button onClick={handleRemove}>{removeIcon}</button>
        </div>
      ) : null}
    </div>
  )
};

export default Tag;