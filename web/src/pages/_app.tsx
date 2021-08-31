import "../styles/global.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 } },
});

//@ts-ignore
export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
