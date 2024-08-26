import "./App.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TransactionChart from "./components/TransactionChart";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Container maxW="container.xl">
          <TransactionChart />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
