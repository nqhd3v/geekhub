import { Table, TableProps } from "antd";
import { useState } from "react";
import { fsRemove } from "../../utils/firebase/firestore";
import Loading from "../Icons/Loading";
import Modal from "../Modal";


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
      visible={visible}
      onClose={onClose}
      title="Quản lý chi nhánh"
    >
      <div className="px-5 py-2 bg-light dark:bg-dark">
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
      </div>
    </Modal>
  );
}

export default BranchModal;