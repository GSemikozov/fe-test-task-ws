import React, { useMemo } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody } from '@/components/ui/table';
import { TableHeader } from '@/components/leaderboard/table-header';
import { TableRows } from '@/components/leaderboard/table-rows';
import { TableEmptyRow } from '@/components/leaderboard/table-empty-row';
import { getColumns } from '@/components/leaderboard/columns';

import { Leader } from '@/types';

interface LeaderboardProps {
  data: Leader[];
  onRemoveLeader: (userId: string) => void;
}

export const LeaderBoard: React.FC<LeaderboardProps> = ({ data, onRemoveLeader }) => {
  const columns = useMemo(() => getColumns(onRemoveLeader), [onRemoveLeader]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isTableEmpty = table.getRowModel().rows?.length === 0;

  return (
    <Table>
      <TableHeader headerGroup={table.getHeaderGroups()} />
      <TableBody>
        {!isTableEmpty ? (
          <TableRows rows={table.getRowModel().rows} />
        ) : (
          <TableEmptyRow columnsLength={columns.length} />
        )}
      </TableBody>
    </Table>
  );
};
