import { AppContainer } from "../layout";
import BuildingUp from "@/components/BuildingUp";
import "./../globals.css";

export default function About() {
  return (
    <AppContainer>
      <div className="feature-buildingup">
        <div className="feature-buildingup-text">
          <h2>About</h2>
          <ul>
            <li>Fast Delivery</li>
            <li>Secure Tracking</li>
            <li>Real-time Updates</li>
            <li>Easy to Use</li>
          </ul>
        </div>
        <BuildingUp />
      </div>
    </AppContainer>
  );
}
