import { Alert, Form, FormProps, Input, Modal, notification } from "antd"
import { useState } from "react";
import { removeNote, TFsMaterialNote } from "../../utils/models/materialNotes";
import Loading from "../Icons/Loading";

interface IConfirmRemove {
  data: TFsMaterialNote;
  onClose: () => void;
  open: boolean;
};

const ConfirmRemove: React.FC<IConfirmRemove> = ({ data, onClose, open }) => {
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [form] = Form.useForm();
  let warningMsg: string = '';

  const handleSubmit: FormProps['onFinish'] = async ({ removeNote: note }) => {
    setIsRemoving(true);
    try {
      if (!data || !data._id) {
        notification.error({ message: 'Không có ghi chú nào được chọn!' });
        onClose();
        setIsRemoving(false);
        form.resetFields();
        return;
      }
      const isRemoved = await removeNote(data._id, note);
      if (!isRemoved) {
        notification.error({ message: 'Xoá ghi chú thất bại!' });
      }
      // await removeNote()
    } catch (err) {
      console.error(err);
    }
    onClose();
    form.resetFields();
    setIsRemoving(false);
  }

  return (
    <Modal
      title={null}
      className="confirm"
      closable={false}
      footer={null}
      open={open}
    >
      {warningMsg ? <Alert message={warningMsg} /> : null}
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Ghi chú xoá"
          name="removeNote"
          className="mb-0"
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea autoSize placeholder="Ghi chú" />
        </Form.Item>
      </Form>
      <div className="flex justify-end items-center pt-6 space-x-2">
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
          disabled={isRemoving}
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
          disabled={isRemoving}
        >
          <span className="text-light dark:text-dark">Thêm</span>
          {isRemoving ? <Loading size={12} className="fill-light dark:fill-dark" /> : null}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmRemove;