"use client";

import React, { useState, useEffect } from "react";
import "./../app/globals.css";
import styles from "./Registro.module.css";
import GetWalletModal from "@/components/GetWalletModal";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";
import { useWallet } from "./ConnectWalletButton";
import { useRouter } from "next/navigation";


const roles = ["Donor", "Company"];
const companyRoles = ["Collector Center", "Laboratory", "Trader"];

const Register = () => {
  const { account, web3, setRole } = useWallet();
  const [companyRole, setCompanyRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [registerSanitario, setRegisterSanitario] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [txHash, setTxHash] = useState<string | null>();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!companyName || !registerSanitario || !companyRole || !location) {
      setErrorMessage("All fields are required");
      return;
    }

    setErrorMessage("");
    var roleNum
    switch (companyRole) {
      case "Collector Center":
        roleNum = 1;
        break;
      case "Laboratory":
        roleNum = 2;
        break;
      case "Trader":
        roleNum = 3;
        break;
      default:
        roleNum = 0;
        break;
    }
    const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_CONTRACT_ADDRESS);
    const receipt = await contractTracker.methods.signUp(companyName, location, roleNum).send({ from: account, gas: '1000000', gasPrice: 1000000000 });
    setTxHash(receipt.transactionHash);
    setRole(roleNum);
    router.push("/all-role-grid")
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Company register form</h2>
      <p>You will have only one wallet per company.</p>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        {
          <>
            <div className={styles.formGroup}>
              <label htmlFor="companyName" className={styles.formLabel}>
                Name of the Company
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.formLabel}>
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="registerSanitario" className={styles.formLabel}>
                Register Sanitario
              </label>
              <input
                type="text"
                id="registerSanitario"
                value={registerSanitario}
                onChange={(e) => setRegisterSanitario(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="companyRole" className={styles.formLabel}>
                Company Role
              </label>
              <select
                id="companyRole"
                value={companyRole}
                onChange={(e) => setCompanyRole(e.target.value)}
                className={styles.formSelect}
                required>
                <option value="" disabled>
                  Select a company role
                </option>
                {companyRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </>
        }
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      {showWalletModal && (
        <GetWalletModal onClose={() => setShowWalletModal(false)} />
      )}
      {txHash ? <h1>The txHash is {txHash}</h1> : <></>}
    </section>
  );
};

export default Register;
