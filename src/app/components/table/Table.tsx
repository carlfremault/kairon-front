import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { AccessorKeyColumnDef, Table } from "@tanstack/react-table";

interface TableProps<TData> {
  data: TData[];
  columns: AccessorKeyColumnDef<TData, string>[];
  colgroup?: JSX.Element;
}

const Table = <TData, _>({ data, columns, colgroup }: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full table-fixed border border-black">
      {colgroup && <colgroup>{colgroup}</colgroup>}
      <thead className="bg-dark-grey text-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-2 text-left text-lg font-normal leading-6 lg:text-xl"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="h-10 even:bg-light-grey">
            {row.getVisibleCells().map((cell, i) => (
              <td key={cell.id} className="p-2 text-lg leading-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
