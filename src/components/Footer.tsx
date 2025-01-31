import React from "react";
import Link from "next/link";
import "./../app/globals.css";
import { AppContainer } from "../app/layout";

const Footer = () => {
  return (
    <footer className="footer">
      <AppContainer>
        <div className="footer-section">
          <div className="footer-column">
            <div className="logo-container">
              <img
                src="/cadena-de-bloques.png"
                alt="Logo"
                className="logo-image"
              />
              <Link href="https://codecrypto.academy/" legacyBehavior>
                <a className="logo-text-footer">codecrypto.academy</a>
              </Link>
            </div>
            <p>Masters en Blockchain & Web3</p>
            <p>Sé referente Blockchain en 12 meses</p>
            <p>100+ Alumnos Formados 8º Ed</p>
            <p>CodeCrypto World Podcast</p>
          </div>
          <div className="footer-column">
            <h2>Contacto</h2>
            <p>Madrid, ESP</p>
            <p>email: codecrypto@codecrypto.com</p>
            <p>phone: +34 654 768 987</p>
          </div>
          <div className="footer-column">
            <h2>Let's Get in Touch</h2>
            <div className="feature-button-footer-container">
              <div className="feature-button-footer">
                <Link href="/get-in-touch" legacyBehavior>
                  <a>Let's Go</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Blood Donation Traceability. All rights reserved.</p>
          <div className="footer-links">
            <Link href="#" legacyBehavior>
              <a>Terms of Service</a>
            </Link>
            <Link href="#" legacyBehavior>
              <a>Trademark Policy</a>
            </Link>
            <Link href="#" legacyBehavior>
              <a>Privacy Policy</a>
            </Link>
          </div>
        </div>
      </AppContainer>
    </footer>
  );
};

export default Footer;
