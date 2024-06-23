"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Register: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wallet = searchParams.get('wallet');
  const role = searchParams.get('role');
  const [institution, setInstitution] = useState<string>('');

  const handleInstitutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstitution(event.target.value);
  };

  const handleSubmit = async () => {
    if (wallet && role) {
      try {
        const response = await fetch('/api/registerStakeholder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wallet, stakeholderType: parseInt(role), info: institution }),
        });

        const data = await response.json();
        if (data.message) {
          alert('Registro exitoso');
          const goBack = confirm('¿Quieres volver a la página principal?');
          if (goBack) {
            router.push('/metamask');
          }
        }
      } catch (error) {
        console.error('Error registering stakeholder:', error);
      }
    }
  };

  return (
    <div>
      <h2>Registro de Stakeholder</h2>
      <p>Wallet: {wallet}</p>
      <p>Rol: {role}</p>
      <input
        type="text"
        placeholder="Nombre de la institución"
        value={institution}
        onChange={handleInstitutionChange}
      />
      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
};

export default Register;
