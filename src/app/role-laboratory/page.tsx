import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";

export default function () {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Laboratory</h2>
          <ul>
            <li>Aceptar las transferencias de centros de extracción</li>
            <li>Rechazar unidad de sangre</li>
            <li>Procesar para generar hemoderivados</li>
            <li>Poner en venta los hemoderivados</li>
          </ul>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
