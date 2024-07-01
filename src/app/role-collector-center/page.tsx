import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";

export default function () {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Collector Center</h2>
          <ul>
            <li>Registrar una donacion</li>
            <li>Enviar una donacion</li>
            <li>Ver historico de donaciones</li>
          </ul>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
