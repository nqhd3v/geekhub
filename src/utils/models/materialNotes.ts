import { notification } from "antd";
import { documentId, DocumentReference, orderBy, QueryConstraint, Timestamp, where } from "firebase/firestore";
import moment from "moment";
import { firebaseDoc } from "../firebase/firebase";
import { fsAdd, fsReadWithCond, fsUpdate, toFsTimestamp } from "../firebase/firestore"

export const addNote = async ({
  name, note, numBough, expDay, boughDay, branchId
}: {
  name: string;
  note: string | undefined;
  numBough: number;
  expDay: Date;
  boughDay: Date;
  branchId: string;
}) => {
  try {
    const branchRef = firebaseDoc('branch', branchId);
    return await fsAdd(
      {
        name,
        note: note || '',
        numBough,
        expDay: toFsTimestamp(expDay),
        boughDay: toFsTimestamp(boughDay),
        branchRef,
        // Default for create
        numUsed: 0,
        isRemoved: false,
        removeNote: '',
      },
      'material_note'
    );
  } catch (err) {
    notification.error({ message: 'Thêm ghi chú nguyên vật liệu thất bại!' });
    console.error('Error when adding new "material-note":', err);
    return false;
  }
}

export const getNotes = async () => {
  try {
    const data = await fsReadWithCond(
      [
        orderBy("boughDay"),
      ],
      'material_note'
    );
    return data;
  } catch (err) {
    notification.error({ message: 'Lỗi truy vấn danh sách nguyên vật liệu' });
    console.error('Error when fetching "material-note":', err);
    return {};
  }
}

export const getNoteByIds = async (ids: string[]) => {
  try {
    const data = await fsReadWithCond(
      [
        where(documentId(), "in", ids),
        orderBy("boughDay"),
      ],
      'material_note'
    );
    return data;
  } catch (err) {
    notification.error({ message: 'Lỗi truy vấn danh sách nguyên vật liệu' });
    console.error('Error when fetching "material-note":', err);
    return {};
  }
}

export type TNoteView = 'default' | 'removed' | 'expired' | 'expiredNotRemove' | 'lte7d' | 'today' | 'all';
export const getNotesByBranch = async (
  id: string,
  type: TNoteView = 'default'
) => {
  try {
    const branchDoc = firebaseDoc('branch', id);
    // Handle condition
    let conditions: QueryConstraint[] = [];
    switch (type) {
      case 'removed': {
        conditions = [
          where('branchRef', '==', branchDoc),
          where('isRemoved', '==', true),
        ]
        break;
      }
      case 'expiredNotRemove': {
        conditions = [
          where('branchRef', '==', branchDoc),
          where('isRemoved', '==', false),
          where('expDay', '<', toFsTimestamp(moment().toDate())),
        ]
        break;
      }
      case 'expired': {
        conditions = [
          where('branchRef', '==', branchDoc),
          where('expDay', '<', toFsTimestamp(moment().toDate())),
        ]
        break;
      }
      case 'lte7d': {
        conditions = [
          where('branchRef', '==', branchDoc),
          where('isRemoved', '==', false),
          where('expDay', '>=', toFsTimestamp(moment().startOf('day').toDate())),
          where('expDay', '<=', toFsTimestamp(moment().add(7, "days").endOf('day').toDate())),
        ]
        break;
      }
      case 'today': {
        conditions = [
          where('branchRef', '==', branchDoc),
          where('isRemoved', '==', false),
          where('expDay', '>=', toFsTimestamp(moment().startOf('day').toDate())),
          where('expDay', '<=', toFsTimestamp(moment().endOf('day').toDate())),
        ]
        break;
      }
      case 'all': {
        conditions = [
          where('branchRef', '==', branchDoc),
        ]
        break;
      }
      default: {
        conditions = [
          where('branchRef', '==', branchDoc),
          where('isRemoved', '==', false),
          where('expDay', '>', toFsTimestamp())
        ]
      }
    }

    const data = await fsReadWithCond(
      conditions,
      'material_note',
    );
    return data;
  } catch (err) {
    notification.error({ message: 'Lỗi truy vấn danh sách nguyên vật liệu' });
    console.error(`Error when fetching "material-note" (material_note/${id}):`, err);
    return {};
  }
}

export const updateNote = async (
  noteId: string,
  {
    name, note, numUsed, numBough, expDay, boughDay, branchId
  }: {
    name: string;
    note: string | undefined;
    numUsed: number;
    numBough: number;
    expDay: Date;
    boughDay: Date;
    branchId: string;
  }
) => {
  try {
    const branchRef = firebaseDoc('branch', branchId);
    return await fsUpdate(
      {
        name,
        note: note || '',
        numBough,
        expDay: toFsTimestamp(expDay),
        boughDay: toFsTimestamp(boughDay),
        branchRef,
        numUsed,
      },
      'material_note',
      noteId,
    );
  } catch (err) {
    notification.error({ message: 'Chỉnh sửa ghi chú nguyên vật liệu thất bại!' });
    console.error(`Error when updating "material-note" [${branchId}]:`, err);
    return false;
  }
}

export const removeNote = async (noteId: string, removeNote: string) => {
  try {
    return await fsUpdate(
      {
        removeNote,
        isRemoved: true,
        removeDay: toFsTimestamp(),
      },
      'material_note',
      noteId,
    );
  } catch (err) {
    notification.error({ message: 'Xoá ghi chú nguyên vật liệu thất bại!' });
    console.error(`Error when removing "material-note" [${noteId}]:`, err);
    return false;
  }
}

/**
 * Move material from `from` branch to `to` branch.
 * @param {string} from Old branch
 * @param {string} to New branch
 * @param {string[]} noteIds Material need to move. Default is move all.
 */
export const moveBranch = async (from: string, to: string, noteIds: string[] = []) => {
  try {
    // Check exist notes
    const notes = noteIds.length === 0
      ? await getNotesByBranch(from)
      : await getNoteByIds(noteIds);
    if (noteIds.length > 0 && Object.keys(notes).length < noteIds.length) {
      const existIds = Object.keys(notes);
      const notExistIds = noteIds.filter(id => !existIds.includes(id));
      console.error('Some notes is not exist when check exist:', notExistIds);
    }

  } catch (err) {
    console.error(`Error when moving "material-note" from branch '${from}' to branch '${to}'`, err);
    return false;
  }
}

export type TMaterialNote = {
  name: string;
  note?: string
  numUsed?: number;
  numBough: number;
  boughDay: Date;
  expDay: Date;
  isRemoved?: boolean;
  removeNote?: string;
  removeDay?: Date;
  branchRef: DocumentReference;
  _id: string;
}


export type TFsMaterialNote = {
  name: string;
  note: string
  numUsed: number;
  numBough: number;
  boughDay: Timestamp;
  expDay: Timestamp;
  isRemoved: boolean;
  removeNote: string;
  removeDay: Timestamp;
  branchRef: DocumentReference;
  _id: string;
}