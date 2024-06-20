// FeatureTopSection.jsx
import React from "react";
import Link from "next/link";
import "./../globals.css";

const FeatureTopBody = () => {
  return (
    <div className="feature-section">
      <div className="feature-image">
        <img src="./../../../public/AllchainBlod.jpg" alt="Blockchain Image" />
      </div>
      <div className="feature-text">
        <h2>Solutions that Adapt & Endure</h2>
        <h1>
          Powering a new standard for traceability on healthcare sector with{" "}
          <span className="highlight">Blockchain</span>
        </h1>
        <p>
          HeroChain is working with experts in the sector to cover real needs
          for all the chain.
        </p>
        <div className="feature-buttons">
          <Link href="/get-in-touch" passHref>
            <button className="feature-button">GET IN TOUCH</button>
          </Link>
          <Link href="/company" passHref>
            <button className="feature-button">LEARN MORE</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureTopBody;
