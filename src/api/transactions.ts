interface Transaction {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: Date;
}

interface TransactionParams {
  symbol: "ETH" | "BTC";
  limit?: number;
}

export const fetchTransactions = async ({
  symbol,
  limit,
}: TransactionParams): Promise<Array<Transaction[]>> => {
  const params = new URLSearchParams({
    symbol,
  });
  if (limit) {
    params.append("limit", limit.toString());
  }

  const response = await fetch("https://api.binance.com/api/v3/trades");
  const json = await response.json();
  if (!json.ok) {
    throw new Error(json?.message ?? "Something went wrong");
  }
  return json;
};
