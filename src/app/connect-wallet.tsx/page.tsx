import React from "react";
import { AppContainer } from "../layout";
import ConnectWalletButton from "./../../components/ConnectWalletButton";
import "./../globals.css";

const ConnectWalletPage = () => {
  return (
    <AppContainer>
      <div>
        <ConnectWalletButton />;
      </div>
    </AppContainer>
  );
};

export default ConnectWalletPage;
