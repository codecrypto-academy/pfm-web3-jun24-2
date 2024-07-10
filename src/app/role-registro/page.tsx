"use client";

import React from "react";
import Link from "next/link";
import "./../../app/globals.css";
import styles from "./../DonationCenter.module.css";

const DonationCenter = ({ account }) => {
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
      <p>
        The wallet {account} is not registered, so if you are a company you can
        register directly from the below link. If you are a donor, you can go to
        one of our donation centers to be registered.
      </p>

      <section>
        <div className={styles.headerSection}>
          <h1>Donation Center</h1>
          <p>
            Your central hub for managing donations and tracking traceability.
          </p>
        </div>
        <nav className={styles.rolesGrid}>
          <div className={styles.roleBox}>
            <img
              src="/AB_blood_group512px.png"
              alt="Register Donation"
              className={styles.roleImg}
            />
            <Link href="/register-donation" legacyBehavior>
              <a className={styles.roleName}>Register a Donation</a>
            </Link>
          </div>
          <div className={styles.roleBox}>
            <img
              src="/Blood_cell512px.png"
              alt="Check Traceability"
              className={styles.roleImg}
            />
            <Link href="/check-traceability" legacyBehavior>
              <a className={styles.roleName}>Check Traceability</a>
            </Link>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default DonationCenter;
