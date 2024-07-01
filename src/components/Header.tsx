"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import "./../app/globals.css";
import { AppContainer } from "../app/layout";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import GetWalletModal from "@/components/GetWalletModal";

const roles = [
  { name: "Register", path: "/role-registro" },
  { name: "Donor", path: "/role-donor" },
  { name: "Collector Center", path: "/role-collector-center" },
  { name: "Laboratory", path: "/role-laboratory" },
  { name: "Trader", path: "/role-traders" },
];

const Header = () => {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    // Check if the wallet is connected
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.selectedAddress
    ) {
      setIsWalletConnected(true);
    }
  }, []);

  const handleRoleClick = (path: string) => {
    if (!isWalletConnected && path !== "/role-registro") {
      setShowWalletModal(true);
    } else {
      router.push(path);
    }
  };

  return (
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
            <div className="nav-item dropdown">
              <div className="nav-link">Partners</div>
              <div className="dropdown-content">
                {roles.map((role) => (
                  <div
                    key={role.name}
                    className="dropdown-link"
                    onClick={() => handleRoleClick(role.path)}>
                    {role.name}
                  </div>
                ))}
              </div>
            </div>
            <ConnectWalletButton />
          </div>
        </div>
      </AppContainer>
      {showWalletModal && (
        <GetWalletModal onClose={() => setShowWalletModal(false)} />
      )}
    </div>
  );
};

export default Header;
