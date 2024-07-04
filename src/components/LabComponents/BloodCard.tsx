'use client'

import { Address } from "@/lib/types";
import Link from "next/link";
import { DonationIcon } from "../ProductIcons";
import { useWallet } from "../ConnectWalletButton";

interface BloodCardProps {
    tokenId: number
    donationCenterAddress: Address
    donationCenterName: string
    donationCenterLocation: string
    donationDate: Date
}

export function BloodCard ({tokenId, donationCenterAddress, donationCenterName, donationCenterLocation, donationDate}: BloodCardProps) {
    const { account, contractTracker } = useWallet()
    
    async function processBloodUnit() {
        if (!account) return
        await contractTracker?.methods.process(tokenId).send({
            from: account
        })
        location.reload()
    } 
    
    return <div className="max-w-lg p-6 bg-gray-400 border border-gray-200 rounded-lg shadow flex flex-col items-start gap-5">
        <div className="flex flex-row items-center gap-3">   
            <DonationIcon />
            <h2>Donation #{tokenId}</h2>
        </div>

        <h3 className="font-normal">
            Extraction date: {Intl.DateTimeFormat('es-ES',{day: "2-digit", month: "2-digit", year:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit"}).format(donationDate)}
        </h3>

        <h3 className="font-normal text-start">
            Donation Center: {donationCenterName}
            <div className="font-normal flex flex-col items-start">
                <p>Location: {donationCenterLocation}</p>
                <p>Address: <span className="text-xs">{donationCenterAddress}</span></p>
            </div>
        </h3>

        <Link href={`/trace/${tokenId}`} className="inline-flex font-medium items-center text-blue-600 hover:underline">
            View full traceability
            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
            </svg>
        </Link>

        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={processBloodUnit}>
            Process
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>
}
