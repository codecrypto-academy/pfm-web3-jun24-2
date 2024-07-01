"use client";

import React, { useState, useEffect } from "react";
import "./../app/globals.css";
import styles from "./Registro.module.css";
import GetWalletModal from "@/components/GetWalletModal";

const roles = ["Donor", "Company"];
const companyRoles = ["Collector Center", "Laboratory", "Trader"];

const Register = () => {
  const [role, setRole] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [registerSanitario, setRegisterSanitario] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.selectedAddress
    ) {
      setWalletAddress(window.ethereum.selectedAddress);
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isWalletConnected && role !== "Register") {
      setShowWalletModal(true);
      return;
    }

    if (
      !walletAddress ||
      !role ||
      (role === "Company" &&
        (!companyName || !registerSanitario || !companyRole)) ||
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
    </section>
  );
};

export default Register;
