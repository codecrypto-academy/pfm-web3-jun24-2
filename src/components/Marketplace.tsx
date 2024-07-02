import { useWallet } from "./ConnectWalletButton";
import { useEffect } from "react";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";

function Marketplace() {

    const { account, web3 } = useWallet();

    // useEffect(() => {

    //     const getRole = async () => {
    //         if (web3) {
    //             const contractTracker = new web3.eth.Contract(abiTracker, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    //             const result = await contractTracker.methods.getTokensOnSale(account).call({ from: account });
    //             if (result.role === 0) {
    //                 setRole(null)
    //             }
    //             setRole(Number(result.role));
    //         }
    //     }

    //     getRole();
    // }, [account]);
    return (
        <p>This is the marketplace component</p>
    )
}

export default Marketplace;