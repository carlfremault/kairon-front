import AccountSection from "./components/AccountSection";
import MarketSection from "./components/MarketSection";

export default async function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between gap-14 p-12 md:flex-row md:p-24 lg:gap-28">
      <AccountSection />
      <MarketSection />
    </main>
  );
}
