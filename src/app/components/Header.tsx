import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import "./../globals.css";

const Header = () => (
  <header className="header">
    <nav className="nav-container">
      <div className="logo-container">
        <Link href="/" className="logo-link">
          <Logo />
        </Link>
      </div>
      <div className="nav-links">
        <div className="nav-item dropdown">
          <Link href="/about" className="nav-link">
            About
          </Link>
          <div className="dropdown-content">
            <Link href="/company" className="dropdown-link">
              Company
            </Link>
            <Link href="/blooddonationeu" className="dropdown-link">
              Blood Donation in Europe
            </Link>
            <Link href="/news" className="dropdown-link">
              News
            </Link>
          </div>
        </div>
        <Link href="/team" className="nav-link">
          Team
        </Link>
        <Link href="/registro" className="nav-link">
          Register
        </Link>
        <Link href="/connect_wallet" className="nav-link">
          Connect Wallet
        </Link>
        <Link href="/docus" className="nav-link">
          Docs
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
