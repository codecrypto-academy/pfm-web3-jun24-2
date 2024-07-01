"use client";

import React, { useState, useEffect } from "react";
import "./../app/globals.css";
import styles from "./Registro.module.css";
import GetWalletModal from "@/components/GetWalletModal";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";
import { useWallet } from "./ConnectWalletButton";


const roles = ["Donor", "Company"];
const companyRoles = ["Collector Center", "Laboratory", "Trader"];

const Register = () => {
  const { account, web3 } = useWallet();
  const [role, setRole] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [registerSanitario, setRegisterSanitario] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [txHash, setTxHash] = useState<string | null>();


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !walletAddress ||
      !role ||
      (role === "Company" &&
        (!companyName || !registerSanitario || !companyRole || !location)) ||
      (role === "Donor" && !bloodType)
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    setErrorMessage("");
    console.log("Role:", role);
    console.log("Wallet Address:", walletAddress);
    if (role === "Company") {
      console.log("Company Name:", companyName);
      console.log("Registro Sanitario:", registerSanitario);
      console.log("Company Role:", companyRole);
    } else if (role === "Donor") {
      console.log("Blood Type:", bloodType);
    }
    if (role === "Company") {
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
      const contractTracker = new web3.eth.Contract(abiTracker, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
      const receipt = await contractTracker.methods.signUp(companyName, location, roleNum).send({ from: account });
      setTxHash(receipt.transactionHash);
      window.location.reload();
    }

  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Register</h2>
      <p>You will have only one wallet per company.</p>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.formLabel}>
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.formSelect}
            required>
            <option value="" disabled>
              Select a role
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="walletAddress" className={styles.formLabel}>
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        {role === "Company" && (
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
        )}
        {role === "Donor" && (
          <div className={styles.formGroup}>
            <label htmlFor="bloodType" className={styles.formLabel}>
              Blood Type
            </label>
            <input
              type="text"
              id="bloodType"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
        )}
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
