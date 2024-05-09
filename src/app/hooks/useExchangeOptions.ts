import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const useExchangeOptions = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["exchanges"],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_KAIRON_API_URL + "/exchanges").then((res) =>
        res.json(),
      ),
  });

  const exchangeOptions = data?.map((exchange: string) => ({
    value: exchange,
    label: capitalizeFirstLetter(exchange),
  }));

  return { isPending, error, exchangeOptions };
};

export default useExchangeOptions;
