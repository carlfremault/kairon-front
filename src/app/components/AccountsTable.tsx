import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "./table/Table";

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
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["accounts"],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_KAIRON_API_URL + "/accounts").then((res) =>
        res.json(),
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <Table data={data} columns={columns} colgroup={colgroup} />;
};

export default AccountsTable;
