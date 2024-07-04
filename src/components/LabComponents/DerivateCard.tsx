import { Derivative } from "@/lib/types"
import Link from "next/link"
import { ErythrocytesIcon, PlasmaIcon, PlateletsIcon } from "../ProductIcons"
import Web3 from "web3"
import { useWallet } from "../ConnectWalletButton"
import { useState } from "react"

interface DerivateCardProps {
    tokenId: number
    product: Derivative
    timestamp: Date
    tokenIdOrigin: number
    price?: bigint
}

const productText = [undefined, 'Plasma', 'Erythrocytes', 'Platelets', 'Blood']

export function DerivateCard ({tokenId, product, timestamp, tokenIdOrigin, price}: DerivateCardProps) {
    const {account, contractTracker, contractDerivative} = useWallet()
    const [listingPrice, setListingPrice] = useState('')
    const [isInvalidPrice, setIsInvalidPrice] = useState(false)

    async function listItem() {
        if (!listingPrice || Number(listingPrice) <= 0) {
            return
        }
        await contractDerivative!.methods
            .approve(contractTracker!.options.address, tokenId)
            .send({from: account!})
        await contractTracker!.methods
            .listItem(contractDerivative!.options.address, tokenId, Web3.utils.toWei(listingPrice, 'ether'))
            .send({from: account!})
            location.reload()
    }

    async function cancelListing() {
        await contractTracker!.methods.cancelListing(contractDerivative!.options.address, tokenId).send({from: account!})
        location.reload()
    }

   return <div className="max-w-lg p-6 bg-gray-400 border border-gray-200 rounded-lg shadow flex flex-col items-start gap-5">
        <div className="flex flex-row items-center gap-3">   
             {product === Derivative.Plasma && <PlasmaIcon/>}
             {product === Derivative.Erythrocytes && <ErythrocytesIcon/>}
             {product === Derivative.Platelets && <PlateletsIcon/>}
            <h2>{productText[product]} #{tokenId}</h2>
        </div>
    
        <h3 className="font-normal">
            Processing date: {Intl.DateTimeFormat('es-ES',{day: "2-digit", month: "2-digit", year:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit"}).format(timestamp)}
        </h3>

        <Link href={`/trace/${tokenIdOrigin}`} className="inline-flex font-medium items-center text-blue-600 hover:underline">
            View traceability from donation #{tokenIdOrigin}
            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
            </svg>
        </Link>

        <div className="flex flex-row gap-5 items-center">
            {price ? (
                <>
                <button onClick={cancelListing} 
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Remove
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" />
                    </svg>
                </button>
                <span className="text-lg font-bold">Price: {Web3.utils.fromWei(price, "ether")} Ethers</span>
                </>
                ) : (
                <>
                <button onClick={listItem}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Place for sell
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
                <input 
                    className="px-1 py-2 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block" 
                    type="number" 
                    placeholder="Price on ethers" required 
                    onChange={(e) => {
                        setIsInvalidPrice(false)
                        setListingPrice(e.target.value)
                    }}
                    min={0}
                />
                </>
            )}
        </div>

    </div>
    
}



