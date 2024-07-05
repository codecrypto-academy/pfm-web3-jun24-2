"use client"
import { Wallet } from "@/components/ConnectWalletButton";
import Marketplace from "@/components/Marketplace";
export default function MarketplacePage() {
    return (
        <Wallet>
            <Marketplace />
        </Wallet>
    )
}