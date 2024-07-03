'use client'

import { useEffect, useState } from "react"
import { useWallet } from "../ConnectWalletButton"
import { getEventsFromDerivative, getTraceFromDonation } from "@/lib/events"
import { DerivateCard } from "../LabComponents/DerivateCard"


export default function Laboratory() {
    const { web3, account, contractTracker, contractDonation, contractDerivative } = useWallet()
    const [donationTokens, setDonationTokens] = useState<Awaited<ReturnType<typeof getDonationTokens>>>([])
    const [derivativeTokens, setDerivativeTokens] = useState<Awaited<ReturnType<typeof getDerivativeTokens>>>([])

    async function getDonationTokens() {
        const arrDonationTokens = []
        const numTokens = await contractDonation!.methods.balanceOf(account).call()
        for (let i = 0; i < Number(numTokens); i++){
            const tokenId = await contractDonation!.methods.tokenOfOwnerByIndex(account, i).call()
            const {donationTrace} = await getTraceFromDonation(Number(tokenId))
            arrDonationTokens.push({
                tokenId: Number(tokenId),
                extractionDatetime: donationTrace!.trace[0].timestamp,
                donationCenterAddress: donationTrace!.trace[0].owner,
                donationCenterName: donationTrace!.trace[0].name,
                donationCenterLocation: donationTrace!.trace[0].location
            }) 
        }
        setDonationTokens(arrDonationTokens)
        return arrDonationTokens
    }

    async function getDerivativeTokens(){
        const arrDerivativeTokens = []
        const numTokens = await contractDerivative!.methods.balanceOf(account).call()
        for (let i = 0; i < Number(numTokens); i++){
            const tokenId = await contractDerivative!.methods.tokenOfOwnerByIndex(account, i).call()
            const derivativeStruct = await contractDerivative!.methods.products(tokenId).call()
            const events = await getEventsFromDerivative(Number(tokenId))
            arrDerivativeTokens.push({
                tokenId: Number(tokenId),
                type: Number(derivativeStruct.derivative),
                processDate: events[0].timestamp,
                tokenIdOrigin: Number(derivativeStruct.tokenIdOrigin)
            }) 
        }
        setDerivativeTokens(arrDerivativeTokens)
        return arrDerivativeTokens
    }

    useEffect(() => {
        if (web3) {
            getDonationTokens()
            getDerivativeTokens()
        }
    }, [web3])

    return <div className="border border-solid flex flex-col flex-1 grow w-max h-full p-3 gap-3">
        <h2>Laboratory dashboard: {account}</h2>
        <div className="flex flex-row gap-10">
            <section className="border border-solid p-3">
                Esta es la sección de sangres en propiedad
            </section>
            <section className="border border-solid p-3 flex flex-col gap-5">
                {/* <DerivateCard></DerivateCard> */}
                {derivativeTokens.length && derivativeTokens.map((value, key) => {
                    return <DerivateCard 
                        key={key}
                        tokenId={value.tokenId} 
                        product={value.type} 
                        timestamp={value.processDate} 
                        tokenIdOrigin={value.tokenIdOrigin}>
                    </DerivateCard>
                })}
            </section>
            <section className="border border-solid p-3">
                Esta es la sección de derivados en venta
            </section>
        </div>
    </div>
}