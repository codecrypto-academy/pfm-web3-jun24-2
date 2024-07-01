import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";

export default function () {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Donor</h2>
          <ul>
            <li>Hacer una donacion</li>
            <li>Ver Balance</li>
            <li>Ver historico de donaciones</li>
          </ul>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
