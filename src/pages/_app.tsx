import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import Header from "src/components/Header";
import { ScreenLayout } from "src/components/Layouts";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ScreenLayout>
        <Header />
        <Component {...pageProps} />
      </ScreenLayout>
    </ChakraProvider>
  );
}

export default MyApp;
