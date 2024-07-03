'use client'

import { useEffect } from "react"
import { useWallet } from "../ConnectWalletButton"



export default function Laboratory() {
    const { web3, account, contractTracker, contractDonation, contractDerivative } = useWallet()

    useEffect(() => {
        if (contractDerivative){
            contractDerivative.methods.balanceOf(account).call()   
            .then(res => {
                console.log(`Numero de tokens ${res}`)
            })
            .catch(err => console.log(err))
        }
    }, [contractDerivative])

    return <div className="border border-solid">
        This is the Laboratory component
    </div>
}
