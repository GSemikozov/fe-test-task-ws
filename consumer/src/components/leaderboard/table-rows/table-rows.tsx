import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender, Row } from "@tanstack/react-table";

import styles from "./table-rows.module.css";

import type { Cell } from "@tanstack/react-table";
import type { Leader } from "@/types";

interface TableRowProps {
    rows: Row<Leader>[];
}

export const TableRows: React.FC<TableRowProps> = ({ rows }) => {
    return rows.map((row) => (
        <TableRow key={row.original.userId} className={styles.row}>
            {row.getVisibleCells().map((cell: Cell<Leader, unknown>) => (
                <TableCell key={cell.id}>
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </TableCell>
            ))}
        </TableRow>
    ))
}
