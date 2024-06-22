import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import "./../globals.css";

export default function About() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Services</h2>
          <ul>
            <li>Consultancy</li>
            <li>Implementation</li>
            <li>Infrastructure</li>
            <li>Development</li>
          </ul>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
