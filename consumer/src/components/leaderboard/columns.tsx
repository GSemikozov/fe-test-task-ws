import { Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { ColumnDef } from "@tanstack/react-table";
import type { Leader } from "@/types/leader";

type RemoveHandler = (id: string) => void;

type GetColumns = (onRemove: RemoveHandler) => ColumnDef<Leader>[];

export const getColumns: GetColumns = (onRemove) => ([
    {
        accessorKey: "avatar",
        cell: ({row}) => (
            <Avatar>
                <AvatarImage src={row.getValue("avatar")} alt={row.getValue("username")} />
                <AvatarFallback>{row.getValue("username")}</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({row}) => (
            <div>{row.getValue("username")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => (
            <div>{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "score",
        header: "Score",
        cell: ({row}) => (
            <div>{row.getValue("score")}</div>
        ),
    },
    {
        id: "actions",
        cell: ({row}) => {
            return (
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => onRemove(row.original.userId)}
                >
                    <Trash className="h-4 w-4 text-sky-500" />
                </Button>
            )
        },
    },
])
