import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import "./../globals.css";

export default function BloodDonationeu() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>Blod Donation in Europe</h2>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
