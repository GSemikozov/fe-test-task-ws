import React from "react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHeader as TableHeaderUIComponent, TableHead, TableRow } from "@/components/ui/table";

import type { Leader } from "@/types";

interface TableHeaderCellProps {
    headerGroup: HeaderGroup<Leader>[];
}

export const TableHeader: React.FC<TableHeaderCellProps> = ({ headerGroup }) => {
    return (
        <TableHeaderUIComponent>
            { headerGroup.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeaderUIComponent>
    )
}
