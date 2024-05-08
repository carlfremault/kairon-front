import { accountsTableData, AccountsTableData } from "../dummyData";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "./table/Table";

const data = accountsTableData;

const columnHelper = createColumnHelper<AccountsTableData>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => "Name",
  }),
  columnHelper.accessor("exchange", {
    cell: (info) => info.getValue(),
    header: () => "Exchange",
  }),
];

const colgroup = (
  <>
    <col style={{ width: "60%" }} />
    <col style={{ width: "40%" }} />
  </>
);
const AccountsTable = () => {
  return <Table data={data} columns={columns} colgroup={colgroup} />;
};

export default AccountsTable;
