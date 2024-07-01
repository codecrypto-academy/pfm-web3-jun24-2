import React from "react";
import "./../globals.css";
import RoleHome from "../../components/RoleHome";
import { AppContainer } from "../layout";
import { Wallet } from "@/components/ConnectWalletButton";

const RoleHomePage = () => {
  return (
    <AppContainer>
      <Wallet>
        <RoleHome />
      </Wallet>
    </AppContainer>
  );
};

export default RoleHomePage;
