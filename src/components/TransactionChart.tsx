import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions";
import { useEffect } from "react";
import { Alert, AlertTitle, Spinner, useToast } from "@chakra-ui/react";
import { EChart } from "@kbox-labs/react-echarts";

function TransactionChart() {
  const toast = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    retry: 1,
    refetchInterval: 60 * 1000, // every one minute
  });

  useEffect(() => {
    if (error) {
      toast({
        status: "error",
        description: error?.message ?? "Something went wrong",
      });
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  if (!data)
    return (
      <Alert status="warning">
        <AlertTitle>No data</AlertTitle>
      </Alert>
    );

  return (
    <EChart
      style={{
        height: "600px",
        width: "100%",
      }}
      tooltip={{
        trigger: "item",
      }}
      xAxis={{
        type: "time",
        name: "Transaction time",
        nameGap: 20,
        nameTextStyle: {
          fontWeight: "bold",
        },
      }}
      yAxis={{
        type: "value",
        min: "dataMin",
        max: "dataMax",
        name: "Transaction price",
        nameGap: 20,
        nameTextStyle: {
          fontWeight: "bold",
        },
      }}
      series={[
        {
          name: "Price",
          data: data.map((value) => [value.time, value.price]),
          type: "line",
        },
      ]}
    />
  );
}

export default TransactionChart;
