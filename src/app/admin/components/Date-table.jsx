"use client";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import React, { useState } from "react";

export function DataTable({ columns, data }) {
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
    });

    return (
        <div className="w-full rounded-md border bg-white dark:bg-gray-900 shadow-md transition">
            <Table>
                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-gray-700 dark:text-gray-300 font-semibold"
                                >
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
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="text-gray-900 dark:text-gray-200"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-gray-700 dark:text-gray-300"
                            >
                                没有结果
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="px-4 flex items-center justify-between space-x-2 py-4 bg-gray-100 dark:bg-gray-800">
                <button
                    className="text-gray-600 dark:text-gray-400 transition hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    上一个
                </button>
                <button
                    className="text-gray-600 dark:text-gray-400 transition hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    下一个
                </button>
            </div>
        </div>
    );
}
