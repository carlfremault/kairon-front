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
  isFetching: boolean;
}

const Table = <TData,>({
  data,
  columns,
  colgroup,
  isFetching,
}: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows.map((row) => (
    <tr key={row.id} className="h-10 even:bg-light-grey">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="p-2 text-lg leading-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  ));

  // Show 'Loading...' in the top row when data is being fetched
  const loadingRow = isFetching ? (
    <tr key="loading" className="h-10 even:bg-light-grey">
      <td
        colSpan={columns.length}
        className="p-2 text-center text-lg leading-4"
      >
        Loading...
      </td>
    </tr>
  ) : null;

  // When necessary, we'll add empty rows to the table to make sure the minimum of rows as specified in ROWS_TO_RENDER is rendered
  let emptyRows: JSX.Element[] = [];
  if (rows.length < ROWS_TO_RENDER) {
    emptyRows = Array.from(
      { length: ROWS_TO_RENDER - rows.length - (loadingRow ? 1 : 0) },
      (_, index) => (
        <tr key={`empty-${index}`} className="h-10 even:bg-light-grey">
          {columns.map((_, columnIndex) => (
            <td key={`empty-cell-${index}-${columnIndex}`}></td>
          ))}
        </tr>
      ),
    );
  }

  const renderedRows = [...rows, loadingRow, ...emptyRows];

  return (
    <table className="w-full table-auto border border-black">
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
