import ClientAccountsSection from "./ClientAccountsSection";
import AccountsTable from "./AccountsTable";

const AccountSection = async () => {
  const fetchAccountsData = async () => {
    "use server";
    return fetch(process.env.NEXT_PUBLIC_KAIRON_API_URL + "/accounts").then(
      (res) => res.json(),
    );
  };
  const initialAccountsData = await fetchAccountsData();

  return (
    <ClientAccountsSection>
      <AccountsTable
        initialData={initialAccountsData}
        fetchData={fetchAccountsData}
      />
    </ClientAccountsSection>
  );
};

export default AccountSection;
