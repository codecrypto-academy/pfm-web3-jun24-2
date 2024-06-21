"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = () => {
    if (role) {
      router.push(`/metamask?role=${role}`);
    } else {
      alert('Por favor, selecciona un rol antes de continuar.');
    }
  };

  return (
    <div>
      <h1>Bienvenido a la Aplicación de Tokenización de Sangre</h1>
      <p>Elija su rol para continuar:</p>
      <select value={role} onChange={handleRoleChange}>
        <option value="">Selecciona un rol</option>
        <option value="0">Unidad de Extracción</option>
        <option value="1">Laboratorio</option>
        <option value="2">Hospital</option>
        <option value="3">Farmacéutica</option>
      </select>
      <button onClick={handleSubmit}>Continuar</button>
    </div>
  );
};

export default Home;
