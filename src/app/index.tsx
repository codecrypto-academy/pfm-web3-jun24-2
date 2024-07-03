import type { AppProps } from "next/app";
import Layout from "./layout";
import { Wallet } from "@/components/ConnectWalletButton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wallet>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Wallet>
  );
}

export default MyApp;
