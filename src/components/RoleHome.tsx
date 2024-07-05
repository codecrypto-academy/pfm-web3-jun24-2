"use client";
import React, { useEffect } from "react";
import styles from "./RoleHome.module.css";
import { AppContainer } from "../app/layout";
import { useWallet } from "./ConnectWalletButton";
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
  const { account, web3, role, setRole, getRole, contractTracker } = useWallet();
  const router = useRouter();

  useEffect(() => {

    getRole();

  }, [account, web3, role]);

  const getRoleComponent = (role) => {

    switch (role) {
      case null:
        return <Spinner />
      case 1:
        return <DonationCenter />
      case 2:
        return <Laboratory />
      case 3:
        return <Trader />
      case 4:
        return <Donor />
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
