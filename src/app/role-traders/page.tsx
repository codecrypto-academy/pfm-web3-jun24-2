import React from "react";
import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";

const TraderPage = () => {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Trader</h2>
          <ul>
            <li>Aceptar las transferencias del Laboratorio</li>
            <li>Rechazar unidad de sangre</li>
            <li>Listar unidad de producto</li>
            <li>Ver historico</li>
          </ul>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
};

export default TraderPage;
