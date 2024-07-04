import Layout from "./layout";
import { Wallet } from "@/components/ConnectWalletButton";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Wallet>
        <Component {...pageProps} />
      </Wallet>
    </Layout>
  );
}

export default MyApp;
