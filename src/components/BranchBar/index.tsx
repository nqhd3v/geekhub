import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BranchModal from './BranchModal';
import Ellipsis from '../Icons/Ellipsis';
import AddNew from './AddNew';
import { notification } from 'antd';
import BranchItem from './BranchItem';
import { getBranches } from '../../utils/models/branches';

interface IBranchesBar {
  selectedBranch: string;
  className?: string;
  onChangeBranch?: (branchId: string) => Promise<void> | void;
}

const BranchesBar: React.FC<IBranchesBar> = ({ className, selectedBranch, onChangeBranch }) => {
  const [isShowBranchModal, setShowBranchModal] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: () => getBranches(),
    queryKey: ['branches'],
    onSuccess: (data: any) => {
      const branchIds = Object.keys(data || {});
      if (branchIds.length > 0 && (!selectedBranch || !branchIds.includes(selectedBranch))) {
        onChangeBranch?.(branchIds[0])
      }
    },
  });

  const handleRefreshData = () => {
    try {
      refetch();
    } catch (err) {
      notification.error({ message: 'Lỗi truy vấn danh sách chi nhánh!' });
    }
  }

  return (
    <>
      <div
        className={`group fixed flex justify-between items-center h-8 z-10 border-t ${className || 'w-main bottom-0 right-0'}`}
        data-loading={isLoading}
      >
        <div
          className={
            'items-center ' +
            'hidden group-data-[loading="true"]:flex '
          }
        >
          <div className="relative w-10 h-2 rounded-md bg-gray-200 mx-2 animate-pulse" />
          <div className="relative w-10 h-2 rounded-md bg-gray-200 mx-2 animate-pulse" />
          <div className="relative w-10 h-2 rounded-md bg-gray-200 mx-2 animate-pulse" />
          <div className="relative w-10 h-2 rounded-md bg-gray-200 mx-2 animate-pulse" />
        </div>
        <div
          className={
            "flex justify-between items-center h-full " +
            'group-data-[loading="true"]:hidden '
          }
        >
          {Object.keys(data || {}).map((branchId: string) => (
            <BranchItem
              key={branchId}
              isSelected={selectedBranch === branchId ? 'selected' : undefined}
              data={data?.[branchId]}
              onSelect={() => onChangeBranch?.(branchId)}
              onRefreshData={handleRefreshData}
            />
          ))}
          {/* Add new */}
          <AddNew onRefreshData={handleRefreshData} />
        </div>
        <div className="w-8 h-full flex justify-center items-center" onClick={() => setShowBranchModal(true)}>
          <Ellipsis size={20} className="fill-dark dark:fill-light" />
        </div>
      </div>

      {/* Modal */}
      <BranchModal
        visible={isShowBranchModal}
        onClose={() => setShowBranchModal(false)}
        onRefreshData={handleRefreshData}
        isLoading={isLoading}
        data={Object.values(data || {})}
      />
    </>
  ) 
}

export default BranchesBar;