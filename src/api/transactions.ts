interface Transaction {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: Date;
}

export const fetchTransactions = async (): Promise<Array<Transaction>> => {
  const params = new URLSearchParams({
    symbol: "BTCUSDT",
  });

  const response = await fetch(`https://api.binance.com/api/v3/trades?${params}`);
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
