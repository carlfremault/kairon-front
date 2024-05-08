import { marketsTableData, MarketsTableData } from "../dummyData";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "./table/Table";

const data = marketsTableData;

const columnHelper = createColumnHelper<MarketsTableData>();

const columns = [
  columnHelper.accessor("market", {
    cell: (info) => info.getValue(),
    header: () => "Market",
  }),
  columnHelper.accessor("price", {
    cell: (info) => <span>${info.getValue()}</span>,
    header: () => "Price (USD)",
  }),
  columnHelper.accessor("account", {
    cell: (info) => info.getValue(),
    header: () => "Account",
  }),
];

const MarketsTable = () => {
  return <Table data={data} columns={columns} />;
};

export default MarketsTable;
