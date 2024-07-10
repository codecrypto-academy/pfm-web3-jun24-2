"use client";

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { abi as abiTracker } from '@/lib/contracts/BloodTracker';

const DonationCentersPage = () => {
  const [donationCenters, setDonationCenters] = useState([]);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  useEffect(() => {
    const loadDonationCenters = async () => {
      if (web3) {
        const bloodTrackerAddress = process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS;
        const bloodTracker = new web3.eth.Contract(abiTracker, bloodTrackerAddress);
        
        const centers = await bloodTracker.methods.getDonationCenters().call();
        setDonationCenters(centers);
      }
    };

    loadDonationCenters();
  }, [web3]);

  return (
    <div>
      <h1>Centros de Donación</h1>
      {donationCenters.length === 0 ? (
        <p>No hay centros de donación disponibles.</p>
      ) : (
        <ul>
          {donationCenters.map((center, index) => (
            <li key={index}>{center}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonationCentersPage;
