import { useState } from 'react';
import BranchesBar from '../../components/BranchBar';
import MaterialNotes from '../../components/MaterialNotes';

const ManageMaterial = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>('');

  const handleChangeBranch = (branchId: string) => {
    setSelectedBranch(branchId);
  }

  return (
    <>
      <div className="relative">
        <MaterialNotes
          selectedBranch={selectedBranch}
        />
      </div>
      <BranchesBar
        selectedBranch={selectedBranch}
        onChangeBranch={handleChangeBranch}
      />
    </>
  )
};

export default ManageMaterial;