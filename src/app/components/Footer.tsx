import React from "react";
import Link from "next/link";
import "./../globals.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <div className="footer-column">
            <img src="logo.png" alt="Logo" className="footer-logo" />
            <p>Masters en Blockchain & Web3</p>
            <p>Sé referente Blockchain en 12 meses</p>
            <p>100+ Alumnos Formados 8º Ed</p>
            <p>CodeCrypto World Podcast</p>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <p>location_on Madrid, ESP</p>
            <p>email codecrypto@codecrypto.com</p>
            <p>phone +34 654 768 987</p>
          </div>
          <div className="footer-column">
            <h3>Let's Get in Touch</h3>
            <Link href="/get-in-touch">
              <div className="feature-buttons">
                <button className="feature-button-footer">Let's Go</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Blood Donation Traceability. All rights reserved.</p>
          <div className="footer-links">
            <Link href="#">Terms of Service</Link>
            <Link href="#">Trademark Policy</Link>
            <Link href="#">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
