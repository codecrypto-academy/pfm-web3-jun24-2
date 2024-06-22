import React from "react";
import MetaMaskWallet from "./../../components/MetaMaskWallet";
import { AppContainer } from "../layout";

const MetaMaskPage: React.FC = () => {
  return (
    <AppContainer>
      <div>
        <h1>MetaMask Wallet</h1>
        <MetaMaskWallet />
      </div>
    </AppContainer>
  );
};

export default MetaMaskPage;
