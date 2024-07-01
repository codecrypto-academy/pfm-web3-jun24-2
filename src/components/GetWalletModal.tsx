"use client";
import React from "react";
import "./../app/globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const GetWalletModal = ({ onClose }) => {
  const router = useRouter(); // Initialize useRouter

  const handleConnectWallet = () => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      // MetaMask is installed
      router.push("/connect-wallet"); // Redirect to ConnectWalletButton component
    } else {
      // MetaMask is not installed
      window.location.href = "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
    }
  };

  return (
    <div className="get-wallet-modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <h2>Get MetaMask</h2>
          <div className="wallet-options">
            <div className="wallet-option">
              <img
                src="/icons8-brave-web-browser-48.png"
                alt="MetaMask for Brave"
              />
              <div>
                <h3>MetaMask for Brave</h3>
                <p>Access your wallet right from your favorite web browser.</p>
                <Link
                  href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  legacyBehavior>
                  <button>Add to Brave</button>
                </Link>
              </div>
            </div>
            <div className="wallet-option">
              <img src="/icons8-info-128.png" alt="MetaMask for Mobile" />
              <div>
                <h3>What is a Wallet?</h3>
                <p>To unlock HeroChain potential, you need a crypto wallet.</p>
                <Link
                  href="https://learn.metamask.io/lessons/what-is-a-crypto-wallet"
                  legacyBehavior>
                  <button>Get More Information</button>
                </Link>
              </div>
            </div>
            <div className="wallet-option">
              <img src="/metamask-icon.png" alt="Connect MetaMask" />
              <div>
                <h3>Connect MetaMask</h3>
                <p>Connect your MetaMask wallet to HeroChain.</p>
                <button onClick={handleConnectWallet}>Connect Wallet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetWalletModal;
