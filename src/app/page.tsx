import React from "react";
import MainBody from "./../components/MainBody";
import ConnectWallet from "@/components/ConnectWallet";

const HomePage = () => (
  <div className="flex flex-col min-h-screen">
    <main className="flex-grow">
      {/* <ConnectWallet></ConnectWallet> */}
      <MainBody />
    </main>
  </div>
);

export default HomePage;
