"use client";

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useRouter, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    ethereum: any;
  }
}

const Connect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam) {
      setRole(roleParam);
    } else {
      setErrorMessage('Role no proporcionado');
    }

    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAccount(accounts[0]);
            if (accounts[0]) {
              checkRegistration(accounts[0]);
            }
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

    if (roleParam) {
      loadWeb3();
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', setAccount);
        window.ethereum.removeListener('disconnect', setAccount);
      }
    };
  }, [searchParams]);

  const checkRegistration = async (wallet: string) => {
    try {
      const response = await fetch(`/api/isStakeholderRegistered?wallet=${wallet}`);
      const data = await response.json();
      setIsRegistered(data.registered);

      if (data.registered) {
        router.push(`/welcome?wallet=${wallet}&role=${role}`);
      } else {
        router.push(`/register?wallet=${wallet}&role=${role}`);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    }
  };

  return (
    <div>
      <h2>MetaMask Wallet</h2>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : account ? (
        <div>
          <p>Connected Account: {account}</p>
          {isRegistered === null && <p>Verifying registration status...</p>}
        </div>
      ) : (
        <p>Please connect your MetaMask wallet.</p>
      )}
    </div>
  );
};

export default Connect;
