"use client";

import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "./table/Table";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import DashboardStatusMessage from "./utils/DashboardStatusMessage";

type AccountsTableData = {
  id: number;
  created: string;
  account_name: string;
  exchange_name: string;
  private_key?: string;
  public_key?: string;
};

const columnHelper = createColumnHelper<AccountsTableData>();

const columns = [
  columnHelper.accessor("account_name", {
    cell: (info) => info.getValue(),
    header: () => "Name",
  }),
  columnHelper.accessor("exchange_name", {
    cell: (info) => capitalizeFirstLetter(info.getValue()),
    header: () => "Exchange",
  }),
];

const colgroup = (
  <>
    <col style={{ width: "60%" }} />
    <col style={{ width: "40%" }} />
  </>
);

const AccountsTable = ({
  initialData,
  fetchData,
}: {
  initialData: AccountsTableData[];
  fetchData: () => Promise<AccountsTableData[]>;
}) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => fetchData(),
    initialData,
  });

  if (error)
    return (
      <DashboardStatusMessage
        statusText={`An error has occurred: ${error.message}`}
      />
    );

  return (
    <Table
      data={data}
      columns={columns}
      colgroup={colgroup}
      isFetching={isFetching}
    />
  );
};

export default AccountsTable;
