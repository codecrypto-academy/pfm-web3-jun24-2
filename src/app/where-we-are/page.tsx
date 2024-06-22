import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import "./../globals.css";

export default function WhereWeAre() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Where we are?</h2>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
