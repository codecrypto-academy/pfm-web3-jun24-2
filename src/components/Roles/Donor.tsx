import { useWallet } from "../ConnectWalletButton";
import { useState, useEffect } from "react";
import DonorDashboard from '../DonorDashboard';
import { getDonationHistory, getDonationCenters } from '../lib/donations';

function Donor() {
    const { account, web3 } = useWallet();
    const [balance, setBalance] = useState<number>(0);
    const [donations, setDonations] = useState([]);
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        if (account) {
            web3?.eth.getBalance(account).then(
                weiBalance => setBalance(parseFloat(web3.utils.fromWei(weiBalance, "ether")))
            );
        }
    }, [account]);

    useEffect(() => {
        const fetchDonations = async () => {
            const donationHistory = await getDonationHistory(account);
            setDonations(donationHistory);
        };

        const fetchCenters = async () => {
            const donationCenters = await getDonationCenters();
            setCenters(donationCenters);
        };

        if (account) {
            fetchDonations();
            fetchCenters();
        }
    }, [account]);

    return (
        <>
            <div>
                This is the Donor component
            </div>
            <div>
                The balance of the {account} is {balance?.toString()} TAS
            </div>
            <DonorDashboard donations={donations} centers={centers} />
        </>
    );
}

export default Donor;
