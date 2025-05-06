"use client";

import { DataTableProps } from "@/types";
import { ReactNode } from "react";

function DataTable<T>({
  data,
  columns,
  keyExtractor,
  actions,
  noDataMessage = "No data found.",
  className = "",
  rowClassName = (index: number) => (index % 2 === 0 ? "bg-white" : "bg-primary-50"),
  roleMap,
  currentUserId,
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-xl shadow-lg ${className}`}>
      <table className="w-full bg-white border border-gray-200 rounded-xl">
        <thead className="bg-primary-900 text-white text-sm uppercase">
          <tr>
            <th className="px-3 py-3 font-bold text-left whitespace-nowrap">#</th>
            {columns.map((column) => (
              <th key={column.key as any} className="px-3 py-3 font-bold text-left whitespace-nowrap">
                {column.header}
              </th>
            ))}
            {actions && <th className="px-3 py-3 font-bold text-left whitespace-nowrap">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-200 text-primary-900">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-6 text-center text-gray-500">
                {noDataMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={keyExtractor(item)} className={`${rowClassName(index)} hover:bg-primary-100`}>
                <td className="px-3 py-2">{index + 1}</td>
                {columns.map((column) => (
                  <td key={column.key as any} className={`px-3 py-2 ${column.key === "size"|| column.key === "colors" && "max-w-20"}`}>
                    {column.render
                      ? column.render(item, index)
                      : column.key === "role" && roleMap
                        ? roleMap[item[column.key as keyof T] as number]
                        : (item[column.key as keyof T] as ReactNode)}
                  </td>
                ))}
                {actions && <td className="px-4 py-3 flex space-x-2 items-center">{actions(item)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
