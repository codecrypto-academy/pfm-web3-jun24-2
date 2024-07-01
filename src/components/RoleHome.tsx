"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./RoleHome.module.css";
import { AppContainer } from "../app/layout";
import { useWallet } from "./ConnectWalletButton";
import { Wallet } from "./ConnectWalletButton";
import Register from "./Registro";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";
import DonationCenter from "./Roles/DonationCenter";
import Laboratory from "./Roles/Laboratory";
import Trader from "./Roles/Trader";



const roles = [
  { name: "Register", img: "/Blood_cell512px.png", path: "/role-registro" },
  { name: "Donor", img: "/donor_card512px.png", path: "/role-donor" },
  {
    name: "Collector Center",
    img: "/Blood_Donation_2.png",
    path: "/role-collector-center",
  },
  {
    name: "Laboratory",
    img: "/Screening_donated_blood256px.png",
    path: "/role-laboratory",
  },
  { name: "Trader", img: "/AB_blood_group512px.png", path: "/role-traders" },
];

const RolesGrid = () => {
  const [balance, setBalance] = useState<string | null>();
  const [role, setRole] = useState<Number | null>(null);
  const { account, web3 } = useWallet();

  useEffect(() => {

    const getRole = async () => {
      if (web3) {
        const contractTracker = new web3.eth.Contract(abiTracker, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
        const result = await contractTracker.methods.companies(account).call({ from: account });
        if (result.role === 0) {
          setRole(null)
        }
        setRole(Number(result.role));
      }
    }

    getRole();
  }, [account]);

  const getRoleComponent = (role) => {

    switch (role) {
      case 1:
        return <DonationCenter />
        break;
      case 2:
        return <Laboratory />
        break;
      case 3:
        return <Trader />
        break;
      default:
        return <></>
        break;
    }
  }




  return (
    <AppContainer>
      <div className={styles.headerSection}>
        <h1>
          Your trusted partner in{" "}
          <span className="highlight-green ">tracing blood donation</span> with{" "}
          <span className="highlight-green ">blockchain</span> solutions.
        </h1>
        <p>
          Our platform leverages blockchain technology to ensure full
          traceability of blood, connecting the entire value chain from the
          donor to the recipient.
        </p>
      </div>
      <div className={styles.rolesGrid}>
        <div>
          {role ? getRoleComponent(role) : <Register />}
        </div>
      </div>
    </AppContainer>
  );
};



export default RolesGrid;
