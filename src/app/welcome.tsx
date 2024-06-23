"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

const Welcome: React.FC = () => {
  const searchParams = useSearchParams();
  const wallet = searchParams.get('wallet');
  const role = searchParams.get('role');

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>Wallet: {wallet}</p>
      <p>Rol: {role}</p>
    </div>
  );
};

export default Welcome;
