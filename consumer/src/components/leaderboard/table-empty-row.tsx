import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableEmptyRowProps {
    columnsLength: number
}

export const TableEmptyRow: React.FC<TableEmptyRowProps> = ({ columnsLength }) => (
    <TableRow>
        <TableCell
            colSpan={columnsLength}
            className="h-24 text-center"
        >
            No results.
        </TableCell>
    </TableRow>
)
