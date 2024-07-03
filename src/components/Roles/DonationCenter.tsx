import { useWallet } from "../ConnectWalletButton";
import { useState, useEffect } from "react";
function DonationCenter() {
    const { account, web3 } = useWallet();
    const [balance, setBalance] = useState<Number>(0);
    useEffect(() => {
        if (account) {
            web3?.eth.getBalance(account).then(
                weiBalance => setBalance(web3.utils.fromWei(Number(weiBalance), "ether"))
            )
        }
    }, [account])
    return (
        <>
            <div>
                This is the Donation Center component
            </div>
            <div>
                The balance of the {account} is {balance?.toString()} TAS
            </div>
        </>

    )
}

export default DonationCenter;