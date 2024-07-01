"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./RoleHome.module.css";
import { AppContainer } from "../app/layout";
import GetWalletModal from "./GetWalletModal";

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
  { name: "Trader", img: "/AB_blood_group512px.png", path: "/role-trader" },
];

const RolesGrid = () => {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    // Check if the wallet is connected
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.selectedAddress
    ) {
      setIsWalletConnected(true);
    }
  }, []);

  const handleClick = (path: string, role: string) => {
    if (role !== "Register" && !isWalletConnected) {
      // If wallet is not connected and the role is not "Register", redirect to GetWalletModal
      router.push("/get-wallet");
    } else {
      // Otherwise, proceed to the role page
      router.push(path);
    }
  };

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
        {roles.map((role) => (
          <div
            key={role.name}
            className={styles.roleBox}
            onClick={() => handleClick(role.path, role.name)}>
            <img src={role.img} alt={role.name} className={styles.roleImg} />
            <div className={styles.roleName}>{role.name}</div>
          </div>
        ))}
      </div>
    </AppContainer>
  );
};

export default RolesGrid;
