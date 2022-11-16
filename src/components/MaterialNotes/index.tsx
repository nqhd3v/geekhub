import React, { useEffect, useState } from "react";
import AddDrawer from "./AddDrawer";
import { useQuery } from '@tanstack/react-query';
import { getNotes, getNotesByBranch, TNoteView } from "../../utils/models/materialNotes";
import NoteListHeader from "./NoteList/NoteListHeader";
import NoteList from "./NoteList";
import EditDrawer from "./EditDrawer";

interface IMaterialNotes {
  selectedBranch: string;
}

const MaterialNotes: React.FC<IMaterialNotes> = ({ selectedBranch }) => {
  const [addDrawerOpening, openAddDrawer] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [viewType, setViewType] = useState<TNoteView>('default');

  const { data, isLoading, refetch } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: () => selectedBranch ? getNotesByBranch(selectedBranch, viewType) : getNotes(),
    queryKey: selectedBranch ? ['notes', selectedBranch, viewType] : ['notes'],
  })


  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBranch, viewType]);

  const handleRefreshData = () => {
    refetch();
  }

  return (
    <>
      <NoteListHeader
        onChangeView={v => setViewType(v)}
        onOpenAddNew={() => openAddDrawer(true)}
        currentView={viewType}
      />
      <NoteList
        data={data}
        isLoading={isLoading}
        onRefreshData={handleRefreshData}
        onEditNote={id => setEditingId(id)}
      />

      <AddDrawer
        open={addDrawerOpening}
        onClose={() => openAddDrawer(false)}
        branch={selectedBranch}
        onRefreshNotes={handleRefreshData}
      />

      <EditDrawer
        data={editingId ? data?.[editingId] : {}}
        open={!!editingId}
        onClose={() => setEditingId(undefined)}
        branch={selectedBranch}
        onRefreshNotes={handleRefreshData}
      />
    </>
  )
}

export default MaterialNotes;