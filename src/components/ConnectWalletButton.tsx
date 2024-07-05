"use client";
import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Web3, { Contract } from "web3";
import "./../app/globals.css";
import GetWalletModal from "@/components/GetWalletModal";
import { abi as abiTracker } from "@/lib/contracts/BloodTracker"
import { abi as abiDonation } from "@/lib/contracts/BloodDonation"
import { abi as abiDerivative } from "@/lib/contracts/BloodDerivative"

type WalletContextType = {
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string>>,
  network: string | null;
  setNetwork: React.Dispatch<React.SetStateAction<string>>,
  installed: boolean | null;
  setInstalled: React.Dispatch<React.SetStateAction<boolean>>,
  isModalOpen: boolean | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isGetWalletModalOpen: boolean | null;
  setIsGetWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  dropdownOpen: boolean | null;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>,
  role: Number,
  setRole: React.Dispatch<React.SetStateAction<Number | null>>,
  getRole: () => Promise<void>,
  web3: Web3 | null;
  setWeb3: React.Dispatch<React.SetStateAction<Web3 | null>>,
  walletType: string | null;
  setWalletType: React.Dispatch<React.SetStateAction<string>>,
  handleConnectWallet: () => Promise<void>;
  handleLogout: () => Promise<void>;
  getNetworkName: (networkId: string) => string;
  getWalletType: () => string;
  handleCloseModal: () => void;
  getWalletLogo: () => string;
  contractTracker: Contract<typeof abiTracker> | undefined
  contractDonation: Contract<typeof abiDonation> | undefined
  contractDerivative: Contract<typeof abiDerivative> | undefined
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

type WalletProviderProps = {
  children: ReactNode;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a Wallet component');
  }
  return context;
}

export const Wallet: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [role, setRole] = useState<Number | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGetWalletModalOpen, setIsGetWalletModalOpen] =
    useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletType, setWalletType] = useState<string>("");
  const [contractTracker, setContractTracker] = useState<Contract<typeof abiTracker>>()
  const [contractDonation, setContractDonation] = useState<Contract<typeof abiDonation>>()
  const [contractDerivative, setContractDerivative] = useState<Contract<typeof abiDerivative>>()

  const router = useRouter();

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
        if (networkId == process.env.NEXT_PUBLIC_CHAIN_ID) {
          setContractTracker(new web3Instance.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS))
          setContractDonation(new web3Instance.eth.Contract(abiDonation, process.env.NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS))
          setContractDerivative(new web3Instance.eth.Contract(abiDerivative, process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS))
        } else {
          setContractTracker(new web3Instance.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS))
          setContractDonation(new web3Instance.eth.Contract(abiDonation, process.env.NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS))
          setContractDerivative(new web3Instance.eth.Contract(abiDerivative, process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS))
        }
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

  useEffect(() => {
    async () => {
      await getRole()
      console.log("El role es", role)
      if (account !== "" && role !== null && role !== 0) {
        router.push("/all-role-grid");
      }
    }

  }, [account, role]);

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
        router.push("/all-role-grid");
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
    } catch (error) {
      console.error(error);
    }
  };

  const getRole = async () => {
    if (web3 && contractTracker) {
      const company = await contractTracker.methods.companies(account).call();
      // Check if it is a donor
      console.log("Rol compañia", company.role)
      if (Number(company.role) === 0) {
        const donor = await contractTracker.methods.donors(account).call({ from: account });
        console.log("Sangre del donante", donor.bloodType)
        if (donor.balance != 0) {
          setRole(4);
        } else {
          setRole(5);
        }
      } else {
        setRole(Number(company.role));
      }
    }
  }

  const getNetworkName = (networkId: string) => {
    switch (networkId) {
      case "1":
        return "Mainnet";
      case "11155111":
        return "Sepolia";
      case "5":
        return "Goerli";
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

  const getWalletLogo = () => {
    switch (walletType) {
      case "MetaMask":
        return "/metamask-icon.png";
      default:
        return "/icons8-hero-32-white.png";
    }
  };

  const contextValue: WalletContextType = {
    account,
    setAccount,
    network,
    setNetwork,
    installed,
    setInstalled,
    isModalOpen,
    setIsModalOpen,
    isGetWalletModalOpen,
    setIsGetWalletModalOpen,
    dropdownOpen,
    setDropdownOpen,
    role,
    setRole,
    getRole,
    web3,
    setWeb3,
    walletType,
    setWalletType,
    handleConnectWallet,
    handleLogout,
    getNetworkName,
    getWalletType,
    handleCloseModal,
    getWalletLogo,
    contractTracker,
    contractDonation,
    contractDerivative
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

const WalletButton = () => {
  const { account,
    setAccount,
    network,
    setNetwork,
    installed,
    setInstalled,
    isModalOpen,
    setIsModalOpen,
    isGetWalletModalOpen,
    setIsGetWalletModalOpen,
    dropdownOpen,
    setDropdownOpen,
    web3,
    setWeb3,
    walletType,
    setWalletType,
    handleConnectWallet,
    handleLogout,
    getNetworkName,
    getWalletType,
    handleCloseModal,
    getWalletLogo,
    contractTracker,
    contractDonation,
    contractDerivative } = useContext(WalletContext);

  const router = useRouter();

  const getToWalletRole = () => {
    router.push("/all-role-grid");
  }

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
            {isModalOpen && <GetWalletModal onClose={handleCloseModal} />}
          </>
        ) : (
          <div className="dropdown-wallet">
            <button
              className="feature-connect-wallet"
              onClick={getToWalletRole}
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
              <div
                className="menu-icon"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
              </div>
            </button>
            {dropdownOpen && (
              <div
                className="dropdown-wallet-content"
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
        )
      ) : (
        <>
          <button
            className="feature-connect-wallet"
            onClick={handleConnectWallet}>
            Connect Wallet
          </button>
          {isGetWalletModalOpen && (
            <GetWalletModal onClose={handleCloseModal} />
          )}
        </>
      )}
    </div>
  );
};

const ConnectWalletButton = () => {
  return (
    <Wallet>
      <WalletButton></WalletButton>
    </Wallet>
  )
}
export default ConnectWalletButton;
