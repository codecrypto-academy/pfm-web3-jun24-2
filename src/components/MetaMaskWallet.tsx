"use client";

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    ethereum: any;
  }
}

const MetaMaskWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

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
            checkRegistration(accounts[0]);
          });

          window.ethereum.on('disconnect', () => {
            setAccount(null);
            setIsRegistered(null);
          });

          if (accounts.length > 0) {
            checkRegistration(accounts[0]);
          }
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    loadWeb3();

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', setAccount);
        window.ethereum.removeListener('disconnect', setAccount);
      }
    };
  }, []);

  const checkRegistration = async (wallet: string) => {
    try {
      const response = await fetch(`/api/isStakeholderRegistered?wallet=${wallet}`);
      const data = await response.json();
      setIsRegistered(data.registered);
    } catch (error) {
      console.error('Error checking registration:', error);
    }
  };

  const registerStakeholder = async () => {
    if (account && role) {
      try {
        const response = await fetch('/api/registerStakeholder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wallet: account, stakeholderType: parseInt(role as string), info: `${role} Information` }),
        });
        const data = await response.json();
        if (data.message) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error('Error registering stakeholder:', error);
      }
    }
  };

  return (
    <div>
      <h2>MetaMask Wallet</h2>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          {isRegistered !== null && (
            isRegistered ? (
              <p>You are registered as a stakeholder.</p>
            ) : (
              <div>
                <p>You are not registered.</p>
                <button onClick={registerStakeholder}>Register as {role}</button>
              </div>
            )
          )}
        </div>
      ) : (
        <p>Please connect your MetaMask wallet.</p>
      )}
    </div>
  );
};

export default MetaMaskWallet;