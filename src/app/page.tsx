import AccountsSection from "./components/AccountsSection";
import MarketsSection from "./components/MarketsSection";

export default async function Home() {
  return (
    <main className="flex min-h-full flex-col items-start justify-between gap-14 p-12 md:flex-row lg:gap-28 lg:p-24">
      <AccountsSection />
      <MarketsSection />
    </main>
  );
}
