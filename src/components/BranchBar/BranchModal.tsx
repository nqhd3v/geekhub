import { Modal, Table, TableProps } from "antd";
import { useState } from "react";
import { fsRemove } from "../../utils/firebase/firestore";
import Loading from "../Icons/Loading";
import XMark from "../Icons/XMark";


interface IBranchModal {
  visible: boolean;
  onClose: () => Promise<void> | void;
  onRefreshData?: () => Promise<void> | void | undefined;
  isLoading?: boolean;
  data: any[];
}
const BranchModal: React.FC<IBranchModal> = ({ visible, onClose, onRefreshData, isLoading, data }) => {
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const [isDeletingBranch, setDeletingBranch] = useState<boolean>(false);

  const handleRemove = async () => {
    setDeletingBranch(true);
    await Promise.all(selectedKeys.map(async (key) => await fsRemove('branch', key)));
    await onRefreshData?.();
    setDeletingBranch(false);
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: () => {
        return (
          <>
            <button
              className={
                "px-2 py-1 bg-red-400 rounded-md hover:bg-red-500 flex items-center " +
                "disabled:bg-gray-400 disabled:cursor-not-allowed "
              }
              onClick={handleRemove}
              disabled={selectedKeys.length === 0 || isDeletingBranch}
            >
              <span className="text-light mr-1">
                Xoá chi nhánh
              </span>
              {isDeletingBranch ? <Loading size={12} className="fill-light dark:fill-light" /> : null}
            </button>
          </>
        )
      },
      dataIndex: 'name',
    },
  ];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      title={(
        <div className="flex items-center justify-between">
          <span>Quản lý chi nhánh</span>
          <button className="w-8 h-8 bg-transparent hover:bg-slate-100/40 rounded-md flex items-center justify-center" onClick={() => onClose()}>
            <XMark size={20} />
          </button>
        </div>
      )}
    >
      <Table
        dataSource={data}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => setSelectedKeys(selectedRowKeys),
          selectedRowKeys: selectedKeys,
        }}
        rowKey="_id"
        loading={isLoading}
        pagination={false}
        scroll={{ y: '330px'}}
      />
    </Modal>
  );
}

export default BranchModal;