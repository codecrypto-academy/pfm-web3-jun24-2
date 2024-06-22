import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import "./../globals.css";

export default function Team() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Inspiration Histories</h2>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
