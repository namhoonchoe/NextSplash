import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Header from "@components/Header";
import { ScreenLayout, CenterBenchMark } from "@components/Layouts";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <RecoilRoot>
              <CenterBenchMark />
              <ScreenLayout>
                <Component {...pageProps} />
              </ScreenLayout>
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={false} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <RecoilRoot>
            <CenterBenchMark />
            <ScreenLayout>
              <Header />
              <Component {...pageProps} />
            </ScreenLayout>
          </RecoilRoot>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
