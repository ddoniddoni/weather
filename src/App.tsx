import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "./components/Navigation";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./components/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Navigation />
      <Home />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
