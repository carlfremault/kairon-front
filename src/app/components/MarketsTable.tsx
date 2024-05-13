"use client";

import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "./table/Table";
import DashboardStatusMessage from "./utils/DashboardStatusMessage";

type MarketsTableData = {
  market_name: string;
  price: string;
  account_name: string;
};

const columnHelper = createColumnHelper<MarketsTableData>();

const columns = [
  columnHelper.accessor("market_name", {
    cell: (info) => info.getValue(),
    header: () => "Market",
  }),
  columnHelper.accessor("price", {
    cell: (info) => <span>${info.getValue()}</span>,
    header: () => "Price (USD)",
  }),
  columnHelper.accessor("account_name", {
    cell: (info) => info.getValue(),
    header: () => "Account",
  }),
];

const MarketsTable = ({
  initialData,
  fetchData,
}: {
  initialData: MarketsTableData[];
  fetchData: () => Promise<MarketsTableData[]>;
}) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["markets"],
    queryFn: () => fetchData(),
    initialData,
  });

  if (error)
    return (
      <DashboardStatusMessage
        statusText={`An error has occurred: ${error.message}`}
      />
    );

  return <Table data={data} columns={columns} isFetching={isFetching} />;
};

export default MarketsTable;
