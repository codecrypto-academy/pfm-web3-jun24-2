import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

const MetaMaskWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAccount(accounts[0]);
          });
        } catch (error) {
          console.error('User denied account access');
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    loadWeb3();
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <p>Please connect your MetaMask wallet.</p>
      )}
    </div>
  );
};

export default MetaMaskWallet;
