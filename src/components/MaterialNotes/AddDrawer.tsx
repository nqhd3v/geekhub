import { DatePicker, Drawer, DrawerProps, Form, FormProps, Input, InputNumber } from "antd"
import React, { useState } from "react";
import { addNote, TMaterialNote } from "../../utils/models/materialNotes";
import Loading from "../Icons/Loading";

interface IAddDrawer extends DrawerProps {
  branch: string;
  onClose: () => void;
  onRefreshNotes?: () => Promise<void> | void;
};

const AddDrawer: React.FC<IAddDrawer> = ({ branch, open, onClose, onRefreshNotes }) => {
  const [isAdding, setAdding] = useState<boolean>(false);
  const [form] = Form.useForm<TMaterialNote>();

  const handleSubmit: FormProps['onFinish'] = async ({ name, numBough, expDay, boughDay, note }) => {
    setAdding(true);
    try {
      await addNote({
        name,
        numBough,
        expDay: expDay.toDate(),
        boughDay: boughDay.toDate(),
        note,
        branchId: branch,
      })
      onClose();
      onRefreshNotes?.();
    } catch (err) {
      console.error(err);
    }
    setAdding(false);
    form.resetFields();
  }
  
  return (
    <Drawer
      open={open}
      onClose={() => onClose?.()}
      title={
        <div className="flex justify-between items-center">
          <span className="text-dark dark:text-light">Thêm ghi chú</span>
          <div className="flex items-center space-x-2">
            <button
              className={
                "px-2 py-1 rounded-md duration-300 " +
                "bg-gray-400 hover:bg-gray-500 dark:bg-neutral-600 dark:hover:bg-neutral-700 text-light " +
                "disabled:bg-gray-400 disabled:cursor-not-allowed "
              }
              onClick={() => {
                onClose();
                form.resetFields();
              }}
              disabled={isAdding}
            >
              Huỷ
            </button>
            <button
              className={
                "px-2 py-1 rounded-md duration-300 " +
                "bg-blue-500 hover:bg-blue-600 dark:bg-slate-50 dark:hover:bg-slate-300 " +
                "flex items-center space-x-1 " +
                "disabled:bg-gray-400 disabled:cursor-not-allowed "
              }
              onClick={() => form.submit()}
              disabled={isAdding}
            >
              <span className="text-light dark:text-dark">Thêm</span>
              {isAdding ? <Loading size={12} className="fill-light dark:fill-dark" /> : null}
            </button>
          </div>
        </div>
      }
      maskClosable={false}
      closable={false}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Tên nguyên vật liệu" name="name" rules={[{ required: true, message: '' }]}>
          <Input placeholder="Tên nguyên vật liệu" />
        </Form.Item>
        <Form.Item label="Chú thích" name="note">
          <Input.TextArea autoSize placeholder="Ghi chú" />
        </Form.Item>
        <div className="italic text-gray-400">Các thông tin bên dưới sẽ không thể chỉnh sửa sau khi tạo.</div>
        <div className="flex justify-between space-x-2">
          <Form.Item label="Ngày mua" name="boughDay" className="flex-1" rules={[{ required: true, message: '' }]}>
            <DatePicker format="DD/MM/YYYY" className="w-full" />
          </Form.Item>
          <Form.Item label="Ngày hết hạn" name="expDay" className="flex-1" rules={[{ required: true, message: '' }]}>
            <DatePicker format="DD/MM/YYYY" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item label="Số lượng mua" name="numBough" rules={[{ required: true, message: '' }]}>
          <InputNumber placeholder="100" />
        </Form.Item>
      </Form>
    </Drawer>
  )
};

export default AddDrawer;
