"use client";

import { DataTableProps } from "@/types";
import { ReactNode } from "react";


const roleMap: Record<number, string> = {
  2004: "User",
  1995: "Admin",
  1996: "Product Manager",
};

function DataTable<T>({ data, columns, keyExtractor, actions, noDataMessage = "No data found." }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="w-full bg-white border border-gray-200 rounded-xl">
        <thead className="bg-primary-900 text-white text-sm uppercase">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-3 font-bold text-left whitespace-nowrap">
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
              <tr
                key={keyExtractor(item)}
                className={`${index % 2 === 0 ? "bg-white" : "bg-primary-50"} hover:bg-primary-100`}>
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-2">
                    {column.key === "role"
                      ? roleMap[item[column.key as keyof T] as number]
                      : column.key === "no"
                        ? index + 1
                        : column.render
                          ? column.render(item)
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
