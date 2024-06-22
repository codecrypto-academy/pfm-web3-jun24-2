import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import "./../globals.css";

export default function Webinar() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Webinars</h2>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
