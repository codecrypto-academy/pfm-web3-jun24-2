import type { AppProps } from "next/app";
import Layout from "./layout";
import { Wallet } from "@/components/ConnectWalletButton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
