"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./../app/globals.css";
import GetWalletModal from "@/components/GetWalletModal"; // Ensure you have this component

const ConnectWalletButton = () => {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [installed, setInstalled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGetWalletModalOpen, setIsGetWalletModalOpen] =
    useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState<boolean>(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletType, setWalletType] = useState<string>("");

  useEffect(() => {
    if (window.ethereum) {
      setInstalled(true);
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts[0]);
        setWalletType(getWalletType());
      };

      const handleChainChanged = (chainId: string) => {
        setNetwork(getNetworkName(chainId));
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      if (window.ethereum.selectedAddress) {
        setAccount(window.ethereum.selectedAddress);
        setWalletType(getWalletType());

        const networkId = window.ethereum.networkVersion;
        setNetwork(getNetworkName(networkId));
      } else {
        setAccount("");
        setNetwork("");
        setWalletType("");
      }
    } else {
      setInstalled(false);
    }
  }, []);

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3?.eth.getAccounts();
        setAccount(accounts[0]);
        setWalletType(getWalletType());

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0]);
          setWalletType(getWalletType());
        });

        const networkId = await web3?.eth.net.getId();
        setNetwork(getNetworkName(networkId));
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsGetWalletModalOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      setAccount("");
      setNetwork("");
      setWalletType("");
      setDropdownOpen(false);
      setRoleDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getNetworkName = (networkId: string) => {
    switch (networkId) {
      case "1":
        return "Mainnet";
      case "4":
        return "Goerli";
      case "11155111":
        return "Sepolia";
      default:
        return "";
    }
  };

  const getWalletType = () => {
    if (window.ethereum.isMetaMask) return "MetaMask";
    return "Unknown Wallet";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseGetWalletModal = () => {
    setIsGetWalletModalOpen(false);
  };

  const getWalletLogo = () => {
    switch (walletType) {
      case "MetaMask":
        return "/metamask-icon.png";
      default:
        return "/icons8-hero-32-white.png";
    }
  };

  return (
    <div className="wallet-container">
      {installed ? (
        account === "" ? (
          <>
            <button
              className="feature-connect-wallet"
              onClick={handleConnectWallet}>
              Connect Wallet
            </button>
            {isModalOpen && <WalletModel onClose={handleCloseModal} />}
          </>
        ) : (
          <div className="header">
            <div className="dropdown">
              <button
                className="feature-connect-wallet"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}>
                <img
                  src={getWalletLogo()}
                  alt={walletType}
                  className="wallet-logo"
                />
                {web3?.utils.isAddress(account)
                  ? `${account.substring(0, 6)} ... ${account.substring(
                      account.length - 4
                    )}`
                  : account}
                <div className="menu-icon">
                  <div className="menu-line"></div>
                  <div className="menu-line"></div>
                  <div className="menu-line"></div>
                </div>
              </button>
              {dropdownOpen && (
                <div
                  className="dropdown-content"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}>
                  <a
                    href="#"
                    className="feature-wallet-logout"
                    onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              )}
            </div>
            <div className="role-dropdown">
              <button
                className="role-button"
                onMouseEnter={() => setRoleDropdownOpen(true)}
                onMouseLeave={() => setRoleDropdownOpen(false)}>
                Role
                <div className="menu-icon">
                  <div className="menu-line"></div>
                  <div className="menu-line"></div>
                  <div className="menu-line"></div>
                </div>
              </button>
              {roleDropdownOpen && (
                <div
                  className="role-dropdown-content"
                  onMouseEnter={() => setRoleDropdownOpen(true)}
                  onMouseLeave={() => setRoleDropdownOpen(false)}>
                  <a href="#">Register</a>
                  <a href="#">Donor</a>
                  <a href="#">Collector Center</a>
                  <a href="#">Laboratory</a>
                  <a href="#">Trader</a>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <>
          <button
            className="feature-connect-wallet"
            onClick={handleConnectWallet}>
            Connect Wallet
          </button>
          {isGetWalletModalOpen && (
            <GetWalletModal onClose={handleCloseGetWalletModal} />
          )}
        </>
      )}
    </div>
  );
};

export default ConnectWalletButton;
