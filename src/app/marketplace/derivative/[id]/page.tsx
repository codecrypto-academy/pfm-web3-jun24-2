"use client"
import Section from "@/components/Section";
import { useWallet } from "@/components/ConnectWalletButton";
import { Wallet } from "@/components/ConnectWalletButton";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";
import { abi as abiDerivative } from "@/../../src/lib/contracts/BloodDerivative";
import { getDerivativeTypeFromNumber } from "@/components/Marketplace";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { BsThreeDots } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { AppContainer } from "@/app/layout";
import { useRouter } from "next/navigation";

function ItemInfo({ params }: { params: { id: string } }) {

    const { account, web3, role, getRole } = useWallet();
    const [tokenInfo, setTokenInfo] = useState<tokenInterface>();

    const tokenId = params.id;
    const router = useRouter();
    interface tokenInterface {
        tokenAddress: string;
        tokenId: Number;
        typeString: string;
        typeNumber: Number;
        price: Number;
        seller: string;
        image: string;
    }

    useEffect(() => {


        const getTokenInfo = async () => {
            if (web3) {
                await getRole()
                if (role === null) {
                    return
                }
                console.log("El rol es", role)
                if (role != 2 && role != 3) {
                    router.push("/all-role-grid")
                }
                const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS);
                const contract = new web3.eth.Contract(abiDerivative, process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS);
                const derivativeType = await contract.methods.products(tokenId).arguments[0];
                const marketplaceData = await contractTracker.methods.getListing(process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS, tokenId);
                setTokenInfo({
                    tokenAddress: process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS,
                    tokenId: Number(tokenId),
                    typeString: getDerivativeTypeFromNumber(Number(derivativeType)),
                    typeNumber: Number(derivativeType),
                    price: web3.utils.fromWei(Number(marketplaceData.arguments[1]), "ether"),
                    seller: marketplaceData.arguments[0].toString(),
                    image: "/AB_blood_group512px.png"
                })
            }
        }
        getTokenInfo()
    }, [web3, account, role]);


    return (
        tokenInfo ?
            <Section>
                <div key="title" className="title">
                    <h2>Derivative Token ID {tokenId}</h2>
                </div>
                <div key="marketPlaces" className="marketPlaces"></div>
                <div className="marketplace">
                    <div className="image">
                        <img src={tokenInfo.image} alt="marketplace" />
                    </div>
                    <div className="name">
                        <h4>{tokenInfo.typeString}</h4>
                        <BsThreeDots />
                    </div>
                    <h3>{tokenId.toString()}</h3>
                    <div className="price-container">
                        <h5 className="price">{tokenInfo.price.toString()}</h5>
                        <FaEthereum />
                    </div>
                </div>
            </Section> : <Spinner></Spinner>
    )
}

const ItemMarketPlace = ({ params }: { params: { id: string } }) => {
    return (
        <AppContainer>
            <Wallet>
                <ItemInfo params={params}></ItemInfo>
            </Wallet>
        </AppContainer>

    )
}

export default ItemMarketPlace;