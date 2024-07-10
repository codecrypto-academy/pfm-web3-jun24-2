import Register from "../../components/Registro";
import { AppContainer } from "../layout";
import { Wallet } from "@/components/ConnectWalletButton";
export default function ConnectWalletPage() {
  return (
    <AppContainer>
      <div>
        <Wallet>
          <Register />
        </Wallet>
      </div>
    </AppContainer>
  );
}
