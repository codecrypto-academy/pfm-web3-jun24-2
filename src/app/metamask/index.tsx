"use client";

import React from 'react';
import MetaMaskWallet from '@/components/MetaMaskWallet';

const MetaMaskPage: React.FC = () => {
  return (
    <div>
      <h1>MetaMask Wallet</h1>
      <MetaMaskWallet />
    </div>
  );
};

export default MetaMaskPage;
