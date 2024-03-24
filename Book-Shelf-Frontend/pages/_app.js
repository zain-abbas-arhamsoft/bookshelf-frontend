import "@/styles/globals.css";
import { QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from "react-query/devtools";
import { NextUIProvider } from '@nextui-org/react'
import { queryClient } from "@/utils/queryClient";
import { store, persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <Component {...pageProps} />
          </NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          </PersistGate>
      </Provider>
    </>
  );
}
