import { Table as AntTable, TableProps } from "antd";

interface ITable extends TableProps<any> {};

const Table: React.FC<ITable> = ({ className, rowClassName, ...props }) => {
  return (
    <AntTable
      className={
        " " +
        (className || "")
      }
      rowClassName={
        " " +
        (rowClassName || "")
      }
      {...props}
    />
  )
};

export default Table;