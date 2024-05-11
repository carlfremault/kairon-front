import ClientMarketSection from "./ClientMarketsSection";
import MarketsTable from "./MarketsTable";

const MarketsSection = async () => {
  const fetchMarketsData = async () => {
    "use server";
    return fetch(process.env.NEXT_PUBLIC_KAIRON_API_URL + "/markets").then(
      (res) => res.json(),
    );
  };
  const initialMarketsData = await fetchMarketsData();

  return (
    <ClientMarketSection>
      <MarketsTable
        initialData={initialMarketsData}
        fetchData={fetchMarketsData}
      />
    </ClientMarketSection>
  );
};

export default MarketsSection;
