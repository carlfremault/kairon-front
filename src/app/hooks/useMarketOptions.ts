import { useQuery } from "@tanstack/react-query";

const useMarketOptions = (id?: number) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["markets", id],
    queryFn: () =>
      fetch(
        process.env.NEXT_PUBLIC_KAIRON_API_URL + "/markets/" + id + "/all",
      ).then((res) => res.json()),
  });

  const marketOptions = data
    ? Object.keys(data).map((key) => ({
        value: key,
        label: key,
      }))
    : [];

  return { isPending, error, marketOptions };
};

export default useMarketOptions;
