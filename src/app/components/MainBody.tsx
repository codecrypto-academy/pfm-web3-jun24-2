import React from "react";
import FeatureTopBody from "./FeatureTopBody";
import "./../globals.css";

const MainBody = () => {
  return (
    <div>
      <FeatureTopBody />
      <div className="header-section">
        <h1>
          Your trusted partner in tracing blood donation with{" "}
          <span className="highlight">blockchain</span> solutions.
        </h1>
        <p>
          Our platform leverages blockchain technology to ensure full
          traceability of blood, connecting the entire value chain from the
          donor to the recipient.
        </p>
      </div>
      <div className="features-section">
        <div className="feature-box scalable">
          <h2>Scalable</h2>
          <p>
            HeroChain is designed to accelerate the adoption of blockchain
            technology by the Healthcare Industry today.
          </p>
        </div>
        <div className="feature-box flexible">
          <h2>Flexible</h2>
          <p>
            Maintaining the flexibility required to evolve and meet future
            stakeholders' needs.
          </p>
        </div>
        <div className="feature-box secure">
          <h2>Secure</h2>
          <p>
            Leveraging blockchain's inherent security features to protect
            sensitive data.
          </p>
        </div>
        <div className="feature-box customizable">
          <h2>Customizable</h2>
          <p>
            Tailor the platform to meet the specific needs of your organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
