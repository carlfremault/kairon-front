import { createColumnHelper } from "@tanstack/react-table";
import Table from "./table/Table";
import { useQuery } from "@tanstack/react-query";
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

const MarketsTable = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["markets"],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_KAIRON_API_URL + "/markets").then((res) =>
        res.json(),
      ),
  });

  if (isPending) return <DashboardStatusMessage statusText="Loading..." />;

  if (error)
    return (
      <DashboardStatusMessage
        statusText={`An error has occurred: ${error.message}`}
      />
    );

  return <Table data={data} columns={columns} />;
};

export default MarketsTable;
