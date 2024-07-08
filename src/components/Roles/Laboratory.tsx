'use client'

import { useEffect, useState } from "react"
import { useWallet } from "../ConnectWalletButton"
import { getEventsFromDerivative, getTraceFromDonation } from "@/lib/events"
import { DerivateCard } from "../LabComponents/DerivateCard"
import { BloodCard } from "../LabComponents/BloodCard"


export default function Laboratory() {
    const { web3, account, contractTracker, contractDonation, contractDerivative } = useWallet()
    const [donationTokens, setDonationTokens] = useState<Awaited<ReturnType<typeof getDonationTokens>>>([])
    const [derivativeTokens, setDerivativeTokens] = useState<Awaited<ReturnType<typeof getDerivativeTokens>>>([])
    const [listedDerivatives, setListedDerivatives] = useState<Awaited<ReturnType<typeof getListedDerivatives>>>([])

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
            const {tokenIdOrigin, derivative} = await contractDerivative!.methods.products(tokenId).call()
            const events = await getEventsFromDerivative(Number(tokenId))
            arrDerivativeTokens.push({
                tokenId: Number(tokenId),
                type: Number(derivative),
                processDate: events[0].timestamp,
                tokenIdOrigin: Number(tokenIdOrigin)
            }) 
        }
        setDerivativeTokens(arrDerivativeTokens)
        return arrDerivativeTokens
    }

    async function getListedDerivatives() {
        const arrListedDerivatives = []
        const tokensOnSale = await contractTracker!.methods.getTokensOnSale(contractDerivative?.options.address).call()
        for (const tokenId of tokensOnSale){
            const {"0": price, "1": seller} = await contractTracker!.methods.getListing(contractDerivative!.options.address, tokenId).call()
            if (web3!.utils.toChecksumAddress(seller) !== web3!.utils.toChecksumAddress(account!)) continue
            const {tokenIdOrigin, derivative} = await contractDerivative!.methods.products(tokenId).call()
            const events = await getEventsFromDerivative(Number(tokenId))
            arrListedDerivatives.push({
                tokenId: Number(tokenId),
                type: Number(derivative),
                processDate: events[0].timestamp,
                tokenIdOrigin: Number(tokenIdOrigin),
                price: BigInt(price)
            })
        }
        setListedDerivatives(arrListedDerivatives)
        return arrListedDerivatives
    }

    useEffect(() => {
        if (web3) {
            getDonationTokens()
            getDerivativeTokens()
            getListedDerivatives()
        }
    }, [web3])

    return <div className="flex flex-col flex-1 grow w-max h-full p-3 gap-5">
        <h2>Laboratory dashboard: {account}</h2>
        <div className="flex flex-row gap-28">
            <section className="border border-solid p-5 flex flex-col gap-5">
                <h2>Stock of blood units</h2>
                {donationTokens.map((value, key) => {
                    return <BloodCard
                        key={value.tokenId}
                        tokenId={value.tokenId}
                        donationCenterAddress={value.donationCenterAddress}
                        donationCenterName={value.donationCenterName}
                        donationCenterLocation={value.donationCenterLocation}
                        donationDate={value.extractionDatetime}>
                    </BloodCard>
                })}
                {!donationTokens.length && <div>No tiene donaciones en propiedad</div>}
            </section>
            <section className="border border-solid p-5 flex flex-col gap-5">
                <h2>Stock of derivatives</h2>
                {derivativeTokens.map((value, key) => {
                    return <DerivateCard 
                        key={value.tokenId}
                        tokenId={value.tokenId} 
                        product={value.type} 
                        timestamp={value.processDate} 
                        tokenIdOrigin={value.tokenIdOrigin}>
                    </DerivateCard>
                })}
                {!derivativeTokens.length && <div>No tiene derivados en propiedad</div>}
            </section>
            <section className="border border-solid p-5 flex flex-col gap-5">
                <h2>Derivatives for sale</h2>
                {listedDerivatives.map((value, key) => {
                    return <DerivateCard 
                        key={value.tokenId}
                        tokenId={value.tokenId} 
                        product={value.type} 
                        timestamp={value.processDate} 
                        tokenIdOrigin={value.tokenIdOrigin}
                        price={value.price}>
                    </DerivateCard>
                })}
                {!listedDerivatives.length && <div>No tiene derivados en venta</div>}
            </section>
        </div>
    </div>
}