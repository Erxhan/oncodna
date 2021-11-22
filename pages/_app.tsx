import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import I18nProvider from "next-translate/I18nProvider";
import { useRouter } from "next/router";
import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider resetCSS theme={theme}>
      <I18nProvider lang={router.locale} namespaces={pageProps._ns}>
        <Component {...pageProps} />
      </I18nProvider>
    </ChakraProvider>
  );
}
