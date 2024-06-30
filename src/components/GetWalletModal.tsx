"use client";
import React from "react";
import "./../app/globals.css";
import Link from "next/link";

const GetWalletModal = ({ onClose }) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetWalletModal;
