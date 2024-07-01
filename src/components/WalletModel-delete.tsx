"use client";
// WalletModal.tsx
import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  gap: 2rem;
  width: 600px;
`;

const Sidebar = styled.div`
  flex: 1;
  background: #1a1a1a;
  color: white;
  border-radius: 10px 0 0 10px;
  padding: 20px;
`;

const MainContent = styled.div`
  flex: 2;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const Text = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const Button = styled.button`
  background-color: #32cd32;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
`;

const LearnMore = styled.a`
  color: #32cd32;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 1rem;
  display: inline-block;
`;

const WalletOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const WalletIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const WalletModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <Modal>
        <Sidebar>
          <WalletOption>
            <WalletIcon src="metamask-icon.png" alt="MetaMask" />
            MetaMask
          </WalletOption>
          <WalletOption>
            <WalletIcon src="trustwallet-icon.png" alt="Trust Wallet" />
            Trust Wallet
          </WalletOption>
          <WalletOption>
            <WalletIcon src="walletconnect-icon.png" alt="WalletConnect" />
            WalletConnect
          </WalletOption>
          <WalletOption>
            <WalletIcon src="coinbase-icon.png" alt="Coinbase Wallet" />
            Coinbase Wallet
          </WalletOption>
        </Sidebar>
        <MainContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Title>What is a Wallet?</Title>
          <Subtitle>A Home for your Digital Assets</Subtitle>
          <Text>
            Wallets are used to send, receive, store, and display digital assets
            like Ethereum and NFTs.
          </Text>
          <Subtitle>A New Way to Log In</Subtitle>
          <Text>
            Instead of creating new accounts and passwords on every website,
            just connect your wallet.
          </Text>
          <Button>Get a Wallet</Button>
          <LearnMore href="#">Learn More</LearnMore>
        </MainContent>
      </Modal>
    </>
  );
};

export default WalletModal;
