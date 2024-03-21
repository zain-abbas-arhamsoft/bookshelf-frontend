import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { NextUIProvider } from '@nextui-org/react'

export default function App({ Component, pageProps }) {
  /* Create a client */
  const queryClient = new QueryClient();
  return (
    <>
      {/* Provide the client to our App */}
      <QueryClientProvider client={queryClient}>
        {/* <NextUIProvider> */}

          <Component {...pageProps} />
          {/* </NextUIProvider> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
