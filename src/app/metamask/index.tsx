import React from 'react';
import MetaMaskWallet from '../components/MetaMaskWallet';

const Home: React.FC = () => {
  return (
    <div>
      <h1>My DApp</h1>
      <MetaMaskWallet />
    </div>
  );
};

export default Home;
