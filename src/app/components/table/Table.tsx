import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { AccessorKeyColumnDef, Table } from "@tanstack/react-table";

const ROWS_TO_RENDER = 12;

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

  const rows = table.getRowModel().rows.map((row) => (
    <tr key={row.id} className="h-10 even:bg-light-grey">
      {row.getVisibleCells().map((cell, i) => (
        <td key={cell.id} className="p-2 text-lg leading-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  ));

  // When necessary, we'll add empty rows to the table to make sure the minimum of rows as specified in ROWS_TO_RENDER is rendered
  let emptyRows: JSX.Element[] = [];
  if (rows.length < ROWS_TO_RENDER) {
    emptyRows = Array.from(
      { length: ROWS_TO_RENDER - rows.length },
      (_, index) => (
        <tr key={`empty-${index}`} className="h-10 even:bg-light-grey">
          {columns.map((_, columnIndex) => (
            <td key={`empty-cell-${index}-${columnIndex}`}></td>
          ))}
        </tr>
      ),
    );
  }

  const renderedRows = [...rows, ...emptyRows];

  return (
    <table className="w-full table-fixed border border-black">
      {colgroup && <colgroup>{colgroup}</colgroup>}
      <thead className="bg-dark-grey text-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-2 text-left text-base font-normal leading-6 lg:text-lg xl:text-xl"
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
      <tbody>{renderedRows}</tbody>
    </table>
  );
};

export default Table;
