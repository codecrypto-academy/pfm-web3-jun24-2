import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import "./../app/globals.css";
import { AppContainer } from "../app/layout";
import ConnectWalletButton from "@/components/ConnectWalletButton";

const Header = () => (
  <div className="header">
    <AppContainer>
      <div className="nav-container">
        <div className="logo-container">
          <Link href="/" className="logo-link">
            <Logo />
          </Link>
        </div>
        <div className="nav-links">
          <div className="nav-item dropdown">
            <div className="nav-link">About</div>
            <div className="dropdown-content">
              <Link href="/company" className="dropdown-link">
                Company
              </Link>
              <Link href="/team" className="dropdown-link">
                Team
              </Link>
              <Link href="/our-promise" className="dropdown-link">
                Our Promise
              </Link>
              <Link href="/where-we-are" className="dropdown-link">
                Where we are?
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <div className="nav-link">Our Services</div>
            <div className="dropdown-content">
              <Link href="/servicios" className="dropdown-link">
                We can help you with
              </Link>
              <Link href="/inspirations" className="dropdown-link">
                Inspiration Stories
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <div className="nav-link">Current Events</div>
            <div className="dropdown-content">
              <Link href="/news" className="dropdown-link">
                In the News
              </Link>
              <Link href="/webinar" className="dropdown-link">
                Webinars
              </Link>
              <Link href="/blooddonationeu" className="dropdown-link">
                Blood Donation in Europe
              </Link>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
            </div>
          </div>
          <ConnectWalletButton />
        </div>
      </div>
    </AppContainer>
  </div>
);

export default Header;
