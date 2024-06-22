import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import "./../globals.css";

export default function Company() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Company</h2>
          <ul>
            <li>Quienes Somos</li>
            <li>Que Hacemos</li>
            <li>Nuestra Etica</li>
            <li>Nuestros Valores</li>
          </ul>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
