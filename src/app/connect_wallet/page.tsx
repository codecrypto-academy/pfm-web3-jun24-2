import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import MetaMaskWallet from "@/components/MetaMaskWallet";
import "./../globals.css";

export default function ConnectWalletPage() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Connect Wallet</h2>
        </div>
        <MetaMaskWallet />
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
