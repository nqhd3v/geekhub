import { DatePicker, Drawer, DrawerProps, Form, FormProps, Input, InputNumber } from "antd"
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TFsMaterialNote, TMaterialNote, updateNote } from "../../utils/models/materialNotes";
import Loading from "../Icons/Loading";

interface IEditDrawer extends DrawerProps {
  data: TFsMaterialNote;
  branch: string;
  onClose: () => void;
  onRefreshNotes?: () => Promise<void> | void;
};

const EditDrawer: React.FC<IEditDrawer> = ({ data, branch, open, onClose, onRefreshNotes }) => {
  const [isUpdating, setUpdating] = useState<boolean>(false);
  const [form] = Form.useForm<TMaterialNote>();

  const handleSubmit: FormProps['onFinish'] = async ({ name, numUsed, numBough, boughDay, expDay, note  }) => {
    setUpdating(true);
    try {
      await updateNote(data._id, {
        name,
        numUsed,
        numBough,
        boughDay: boughDay.toDate(),
        expDay: expDay.toDate(),
        note,
        branchId: branch,
      })
      onClose();
      onRefreshNotes?.();
    } catch (err) {
      console.error(err);
    }
    setUpdating(false);
    form.resetFields();
  }

  const initialValues = open ? {
    ...data,
    boughDay: moment(data.boughDay.toDate()),
    expDay: moment(data.expDay.toDate()),
    removeDay: undefined
  } : undefined;

  useEffect(() => {
    if (open && initialValues && !isUpdating) {
      form.setFieldsValue(initialValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialValues])
  
  return (
    <Drawer
      open={open}
      onClose={() => onClose?.()}
      title={
        <div className="flex justify-between items-center">
          <span className="text-dark dark:text-light">Sửa ghi chú</span>
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
              disabled={isUpdating}
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
              disabled={isUpdating}
            >
              <span className="text-light dark:text-dark">Cập nhật</span>
              {isUpdating ? <Loading size={12} className="fill-light dark:fill-dark" /> : null}
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
        <div className="flex justify-between space-x-2">
          <Form.Item label="Ngày mua" name="boughDay" className="flex-1" rules={[{ required: true, message: '' }]}>
            <DatePicker format="DD/MM/YYYY" className="w-full" />
          </Form.Item>
          <Form.Item label="Ngày hết hạn" name="expDay" className="flex-1" rules={[{ required: true, message: '' }]}>
            <DatePicker format="DD/MM/YYYY" className="w-full" />
          </Form.Item>
        </div>
        <div className="flex justify-between space-x-2">
          <Form.Item label="Số lượng sử dụng" name="numUsed" rules={[{ required: true, message: '' }]}>
            <InputNumber placeholder="10" className="!w-full" />
          </Form.Item>
          <Form.Item label="Số lượng mua" name="numBough" rules={[{ required: true, message: '' }]}>
            <InputNumber placeholder="100" className="!w-full" />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
};

export default EditDrawer;
