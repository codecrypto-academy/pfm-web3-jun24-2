import React from "react";
import { AppContainer } from "../layout";
import GetWalletModal from "./../../components/GetWalletModal";
import "./../globals.css";

const GetWallet = () => {
  return (
    <AppContainer>
      <div>
        <GetWalletModal onClose={() => window.history.back()} />;
      </div>
    </AppContainer>
  );
};

export default GetWallet;
