import React from "react";
import AppContainer from "../layout";
import RegisterDonation from "@/components/RegisterDonation";
import { Wallet } from "@/components/ConnectWalletButton";
import "./../globals.css";

export default function RegisterDonationPage() {
  return (
    <AppContainer>
      <Wallet>
        <RegisterDonation />
      </Wallet>
    </AppContainer>
  );
}
