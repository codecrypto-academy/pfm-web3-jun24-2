"use client";
import React, { useState, useEffect } from "react";
import styles from "./RoleHome.module.css";
import { AppContainer } from "../app/layout";
import { useWallet } from "./ConnectWalletButton";
import Register from "./Registro";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";
import DonationCenter from "./Roles/DonationCenter";
import Laboratory from "./Roles/Laboratory";
import Trader from "./Roles/Trader";
import { Spinner } from "./Spinner";
import { useRouter } from "next/navigation";
import Donor from "./Roles/Donor";


const rolesData = [
  { name: "Company", img: "/Blood_cell512px.png", path: "/role-registro" },
  { name: "Donor", img: "/Donor_card512px.png", path: "/role-donor" },
];

const RolesGrid = () => {
  const { account, web3, role, setRole } = useWallet();
  const router = useRouter();

  useEffect(() => {

    const getRole = async () => {
      if (web3) {
        const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS);
        const company = await contractTracker.methods.companies(account).call({ from: account });
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
    getRole();
  }, [account, web3]);

  const getRoleComponent = (role) => {

    switch (role) {
      case null:
        return <Spinner />
        break;
      case 1:
        return <DonationCenter />
        break;
      case 2:
        return <Laboratory />
        break;
      case 3:
        return <Trader />
        break;
      case 4:
        return <Donor></Donor>
        break;
      default:
        return (
          <>
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
            </div >
            <p>The wallet {account} is not registered so if you are a company you can register directly from the below link. If you are a donor you can go to one of our donation centers to be registered.</p>

            <div className={styles.rolesGrid}>
              {rolesData.map((role) => (
                <div
                  key={role.name}
                  className={styles.roleBox}
                  onClick={() => handleClick(role.path)}>
                  <img src={role.img} alt={role.name} className={styles.roleImg} />
                  <div className={styles.roleName}>{role.name}</div>
                </div>
              ))}
            </div>
          </>
        )
        break;
    }
  }

  const handleClick = (path: string) => {
    router.push(path);
  }


  return (
    <AppContainer>

      <div className={styles.rolesGrid}>
        <div>
          {/* {role != null ? getRoleComponent(role) : <Spinner />} */}
          {getRoleComponent(role)}
        </div>
      </div>
    </AppContainer>
  );
}


export default RolesGrid;
