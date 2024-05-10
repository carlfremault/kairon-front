import { useQuery } from "@tanstack/react-query";

type AccountOptionType = {
  id: number;
  account_name: string;
  exchange_name: string;
};

const useAccountOptions = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["accounts"],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_KAIRON_API_URL + "/accounts").then((res) =>
        res.json(),
      ),
  });

  const accountOptions = data?.map((account: AccountOptionType) => ({
    id: account.id,
    value: account.exchange_name,
    label: account.account_name,
  }));

  return { isPending, error, accountOptions };
};

export default useAccountOptions;
