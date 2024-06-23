"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const roleMap: { [key: string]: string } = {
  "0": "Unidad de Extracción",
  "1": "Laboratorio",
  "2": "Hospital",
  "3": "Farmacéutica",
};

const Register: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [roleName, setRoleName] = useState<string | null>(null);
  const [institutionName, setInstitutionName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    const walletParam = searchParams.get('wallet');
    if (roleParam && walletParam) {
      setRole(roleParam);
      setAccount(walletParam);
      const roleName = roleMap[roleParam];
      setRoleName(roleName ? roleName : 'Rol desconocido');
    } else {
      setErrorMessage('Role o Wallet no proporcionado');
    }
  }, [searchParams]);

  const handleRegister = async () => {
    if (!account || !role) return;

    try {
      const response = await fetch('/api/registerStakeholder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet: account,
          role,
          institutionName,
        }),
      });

      if (response.ok) {
        alert('Registro exitoso');
        router.push('/metamask');
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  };

  return (
    <div>
      <h2>Registro de Stakeholder</h2>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          {account && <p>Wallet: {account}</p>}
          {roleName && <p>Rol: {roleName}</p>}
          <div>
            <label>
              Nombre de la institución:
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleRegister}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default Register;
