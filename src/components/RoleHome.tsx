"use client";

import React, { useState } from "react";
import "./../app/globals.css";
import styles from "./Registro.module.css";

const roles = ["Donor", "Company"];

const Register = () => {
  const [role, setRole] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [registerSanitario, setRegisterSanitario] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !walletAddress ||
      !role ||
      (role === "Company" && (!companyName || !registerSanitario)) ||
      (role === "Donor" && !bloodType)
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    setErrorMessage("");
    // Process form submission
    console.log("Role:", role);
    console.log("Wallet Address:", walletAddress);
    if (role === "Company") {
      console.log("Company Name:", companyName);
      console.log("Registro Sanitario:", registerSanitario);
    } else if (role === "Donor") {
      console.log("Blood Type:", bloodType);
    }
  };

  return (
    <section>
      <h2>Register</h2>
      <p>You will have only one wallet per company.</p>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.formGroup}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
          <label htmlFor="walletAddress">Wallet Address</label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
        </div>
        {role === "Company" && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Name of the Company</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="registerSanitario">Register Sanitario</label>
              <input
                type="text"
                id="registerSanitario"
                value={registerSanitario}
                onChange={(e) => setRegisterSanitario(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {role === "Donor" && (
          <div className={styles.formGroup}>
            <label htmlFor="bloodType">Blood Type</label>
            <input
              type="text"
              id="bloodType"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
            />
          </div>
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Register;
