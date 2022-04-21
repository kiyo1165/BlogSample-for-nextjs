import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GlobalStateProvider } from "../context/StateProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <Layout title={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </GlobalStateProvider>
  );
}

export default MyApp;
