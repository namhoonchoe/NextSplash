import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Header from "@components/Header";
import { ScreenLayout } from "@components/Layouts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider >
      <RecoilRoot>
        <ScreenLayout>
          <Header />
          <Component {...pageProps} />
        </ScreenLayout>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
