"use client";

import React, { useState, useEffect } from "react";
import "./../app/globals.css";
import styles from "./registerDonation.module.css";
import { useWallet } from "./ConnectWalletButton";
import { isAddress } from "web3-utils";

const RegisterDonation = () => {
  const { account, contractDonation, web3 } = useWallet();
  const [donorAddress, setDonorAddress] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [donationCenterAddress, setDonationCenterAddress] = useState(
    account || ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    if (account) {
      setDonationCenterAddress(account);
    }
  }, [account]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !donorAddress ||
      !bloodType ||
      !donationDate ||
      !donationCenterAddress
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    if (!isAddress(donorAddress) || !isAddress(donationCenterAddress)) {
      setErrorMessage("Please provide valid Ethereum wallet addresses");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const receipt = await contractDonation.methods
        .mint(donorAddress)
        .send({ from: account });

      console.log("Token minted successfully", receipt);
      setTransactionHash(receipt.transactionHash);
    } catch (error) {
      console.error("Transaction error", error);
      setErrorMessage(
        `Error saving donation: ${error.message || JSON.stringify(error)}`
      );
    } finally {
      setIsLoading(false);
    }

    const newDonation = {
      donorAddress,
      bloodType,
      donationDate,
      donationCenterAddress,
    };

    try {
      const response = await fetch("/api/writeMockData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDonation),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Donation registered successfully");
    } catch (error) {
      setErrorMessage("Error saving donation: " + error.message);
    }
  };

  return (
    <div>
      <div className={styles.headerSection}>
        <h1>
          Your trusted partner in{" "}
          <span className="highlight-green">tracing blood donation</span> with{" "}
          <span className="highlight-green">blockchain</span> solutions.
        </h1>
        <p>
          Our platform leverages blockchain technology to ensure full
          traceability of blood, connecting the entire value chain from the
          donor to the recipient.
        </p>
      </div>
      <div className={styles.walletInfo}>
        <p>
          The wallet <strong>{account}</strong> is allowed to perform the
          following actions:
        </p>
      </div>
      <section>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <h1>Register a Blood Donation</h1>
          <p>
            Please fill in the details below to register a new blood donation.
          </p>
          <div className={styles.formGroup}>
            <label htmlFor="donorAddress">Donor Address*</label>
            <input
              type="text"
              id="donorAddress"
              value={donorAddress}
              onChange={(e) => setDonorAddress(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bloodType">Blood Type*</label>
            <select
              id="bloodType"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required>
              <option value="" disabled>
                Select a blood type
              </option>
              {bloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="donationDate">Donation Date*</label>
            <input
              type="date"
              id="donationDate"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="donationCenterAddress">
              Donation Center Address*
            </label>
            <input
              type="text"
              id="donationCenterAddress"
              value={donationCenterAddress}
              readOnly
            />
          </div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          {transactionHash && (
            <p className={styles.successMessage}>
              Transaction successful! Hash: {transactionHash}
            </p>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterDonation;
