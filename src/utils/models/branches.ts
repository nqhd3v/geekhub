import { notification } from "antd";
import { fsAdd, fsRead } from "../firebase/firestore"

export const addBranch = async (name: string, description?: string) => {
  try {
    return await fsAdd(
      {
        name,
        description: description || '',
      },
      'branch'
    );
  } catch (err) {
    notification.error({ message: 'Tạo thêm chi nhánh thất bại!' });
    return false;
  }
}

export const getBranches = async () => {
  try {
    const data = await fsRead('branch');
    return data;
  } catch (err) {
    notification.error({ message: 'Lỗi truy vấn danh sách chi nhánh' });
    return {};
  }
}

export type TBranch = {
  name: string;
  description: string;
}