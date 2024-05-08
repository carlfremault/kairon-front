export type ReactSelectOption = {
  readonly label: string;
  readonly value: string;
};

export type AccountsTableData = {
  id: number;
  name: string;
  exchange: string;
};

export type MarketsTableData = {
  id: number;
  market: string;
  price: string;
  account: string;
};

export const exchangeOptions: readonly ReactSelectOption[] = [
  {
    label: "Exchange 1",
    value: "Exchange 1",
  },
  {
    label: "Exchange 2",
    value: "Exchange 2",
  },
  {
    label: "Exchange 3",
    value: "Exchange 3",
  },
];
export const marketOptions: readonly ReactSelectOption[] = [
  {
    label: "Market 1",
    value: "Market 1",
  },
  {
    label: "Market 2",
    value: "Market 2",
  },
  {
    label: "Market 3",
    value: "Market 3",
  },
];
export const accountOptions: readonly ReactSelectOption[] = [
  {
    label: "Account 1",
    value: "Account 1",
  },
  {
    label: "Account 2",
    value: "Account 2",
  },
  {
    label: "Account 3",
    value: "Account 3",
  },
];

export const accountsTableData: AccountsTableData[] = [
  {
    id: 1,
    name: "Binance Main",
    exchange: "Binance",
  },
  {
    id: 2,
    name: "Bybit fund",
    exchange: "Bybit",
  },
];

export const marketsTableData: MarketsTableData[] = [
  {
    id: 1,
    market: "ATOM/USDT",
    price: "11.05",
    account: "Binance Main",
  },
];
