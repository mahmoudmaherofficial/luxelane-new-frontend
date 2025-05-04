"use client";

import { ReactNode, memo, useMemo } from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  actions?: (item: T) => ReactNode;
  noDataMessage?: string;
}

const roleMap: Record<number, string> = {
  2004: "User",
  1995: "Admin",
  1996: "Product Manager",
};

// Memoized table row component
function TableRow<T>({
  item,
  columns,
  isEven,
  actions,
  keyExtractor,
}: {
  item: T;
  columns: Column<T>[];
  isEven: boolean;
  actions?: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
}) {
  return (
    <tr
      className={`transition-all duration-200 ${isEven ? "bg-white" : "bg-primary-50"} hover:bg-dusty-rose hover:bg-opacity-20`}>
      {columns.map((column) => (
        <td key={column.key} className="px-3 py-2 sm:px-4 sm:py-3 text-base">
          {column.key === "role"
            ? roleMap[item[column.key as keyof T] as unknown as number]
            : column.render
              ? column.render(item)
              : (item[column.key as keyof T] as unknown as ReactNode)}
        </td>
      ))}
      {actions && <td className="px-3 py-2 sm:px-4 sm:py-3 text-base space-x-2">{actions(item)}</td>}
    </tr>
  );
}

const MemoizedTableRow = memo(TableRow) as typeof TableRow;

function DataTable<T>({ data, columns, keyExtractor, actions, noDataMessage = "No data found." }: DataTableProps<T>) {
  // Precompute table rows to avoid re-rendering on each render
  const tableRows = useMemo(() => {
    return data.map((item, index) => (
      <MemoizedTableRow
        key={keyExtractor(item)}
        item={item}
        columns={columns}
        isEven={index % 2 === 0}
        actions={actions}
        keyExtractor={keyExtractor}
      />
    ));
  }, [data, columns, actions, keyExtractor]);

  // Precompute table header to avoid re-rendering
  const tableHeader = useMemo(
    () => (
      <thead className="bg-gradient-to-r from-primary-900 to-primary-800 text-primary-100 text-sm uppercase tracking-wider">
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-3 py-2 sm:px-4 sm:py-3 font-extrabold text-start whitespace-nowrap">
              {column.header}
            </th>
          ))}
          {actions && (
            <th className="px-3 py-2 sm:px-4 sm:py-3 font-extrabold text-start whitespace-nowrap">Actions</th>
          )}
        </tr>
      </thead>
    ),
    [columns, actions]
  );

  // Precompute empty state
  const emptyState = useMemo(
    () => (
      <tr>
        <td
          colSpan={columns.length + (actions ? 1 : 0)}
          className="px-3 py-4 sm:px-4 sm:py-6 text-center text-primary-500 text-base">
          {noDataMessage}
        </td>
      </tr>
    ),
    [columns.length, actions, noDataMessage]
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg z-10 relative" style={{ contain: "content" }}>
      <table className="w-full bg-soft-ivory border border-primary-100 rounded-xl">
        {tableHeader}
        <tbody className="divide-y divide-primary-100 text-primary-900">
          {data.length > 0 ? tableRows : emptyState}
        </tbody>
      </table>
    </div>
  );
}

export default memo(DataTable) as typeof DataTable;
