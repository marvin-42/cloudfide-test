import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions";
import { useEffect } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { EChart } from "@kbox-labs/react-echarts";

function TransactionChart() {
  const toast = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    retry: 1,
    // refetchInterval: 60 * 1000, // every one minute
  });

  useEffect(() => {
    console.log(error);
    if (error) {
      toast({
        status: "error",
        description: error?.message ?? "Something went wrong",
      });
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  if (!data) return <p>No data</p>;

  return (
    <EChart
      style={{
        height: "600px",
        width: "100%",
      }}
      tooltip={{
        trigger: "axis",
      }}
      xAxis={{
        type: "time",
      }}
      yAxis={{
        type: "value",
      }}
      series={[
        {
          name: "Price",
          data: data.map((value) => [value.time, value.price]),
          type: "line",
        },
        {
          name: "Quantity",
          data: data.map((value) => [value.time, value.qty]),
          type: "line",
        },
      ]}
    />
  );
}

export default TransactionChart;
