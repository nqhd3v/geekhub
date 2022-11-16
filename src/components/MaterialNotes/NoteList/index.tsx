import { Progress, Table, TableProps } from "antd";
import moment from "moment";
import React, { useState } from "react"
import ConfirmRemove from "./ConfirmRemove";
import ExpDate from "./ExpDate";
import NoteListActions from "./NoteListActions";

interface INoteList {
  data: any;
  isLoading?: boolean;
  onRefreshData?: () => void;
  onEditNote: (noteId: string) => void;
}

const NoteList: React.FC<INoteList> = ({ data, isLoading, onEditNote, onRefreshData }) => {
  const [removingId, setRemovingId] = useState<string | undefined>(undefined);

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Nguyên vật liệu',
      dataIndex: 'name',
      width: 180,
      fixed: 'left',
      render: (val, { isRemoved }) => <span data-removed={!!isRemoved}>{val}</span>,
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'boughDay',
      width: 120,
      render: (val, { isRemoved }) => <span data-removed={!!isRemoved}>{moment(val.toDate()).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expDay',
      width: 120,
      render: (val, record) => <ExpDate date={val ? val.toDate() : undefined} isRemoved={record.isRemoved} />,
    },
    {
      title: 'Số lượng',
      dataIndex: 'numBough',
      width: 150,
      render: (val, record) => (
        <Progress
          type="line"
          percent={((record.numUsed || 0) * 100) / val}
          format={() => <span className="text-dark dark:text-light">{record.numUsed || 0}/{val}</span>}
        />
      )
    },
    {
      title: 'Thao tác',
      dataIndex: '_id',
      fixed: 'right',
      width: 100,
      render: (val, { isRemoved }) => (
        <NoteListActions
          onEdit={() => onEditNote(val)}
          onDelete={() => setRemovingId(val)}
          isDeleting={removingId === val}
          isRemoved={isRemoved}
        />
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={Object.values(data || {})}
        rowKey="_id"
        loading={isLoading}
        scroll={{ x: '100%'}}
        pagination={false}
      />
      <ConfirmRemove
        data={data?.[removingId || '']}
        open={!!removingId}
        onClose={() => setRemovingId(undefined)}
        onRefreshData={onRefreshData}
      />
    </>
  )
};

export default NoteList;