import { useWallet } from "./ConnectWalletButton";
import { useEffect } from "react";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";
import { abi as abiDerivative } from "@/../../src/lib/contracts/BloodDerivative";
import { abi as abiDonation } from "@/../../src/lib/contracts/BloodDonation";
import { BsThreeDots } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import { Spinner } from "./Spinner";
import Link from "next/link";
import Section from "./Section";
import { AppContainer } from "@/app/layout";

export const getDerivativeTypeFromNumber = (derivativeType: Number) => {
    switch (derivativeType) {
        case 1:
            return "PLASMA"
            break;
        case 2:
            return "ERYTHROCYTES"
            break;
        case 3:
            return "PLATELETS"
            break;
        default:
            break;
    }
}


function Marketplace() {

    const { account, web3 } = useWallet();
    const [buttonIndex, setButtonIndex] = useState<Number>(0);
    // const tokenAddresses = [process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS, process.env.NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS];
    const tokenAddresses = [process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS];
    // const [bloodTokensOnSale, setBloodTokensOnSale] = useState<tokenBlood[]>([]);
    // const [derivativeTokensOnSale, setDerivativeTokensOnSale] = useState<tokenBlood[]>([]);
    const [tokensOnSale, setTokensOnSale] = useState<tokenInterface[]>([]);

    interface tokenInterface {
        tokenAddress: string;
        tokenId: Number;
        typeString: string;
        typeNumber: Number;
        price: Number;
        seller: string;
        image: string;
    }

    const marketPlaceType = [
        "All",
        "Plasma",
        "Erythrocytes",
        "Platelets",
    ];

    const handleButtonClick = (index) => {
        console.log("Index button pressed", index);
        setButtonIndex(index);
    }

    useEffect(() => {
        const getTokensOnSale = async () => {
            var tokens: tokenInterface[] = [];
            if (web3) {
                for (const address of tokenAddresses) {
                    const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS);
                    const result = await contractTracker.methods.getTokensOnSale(address).call({ from: account })
                    for (const tokenId of result) {
                        const contract = new web3.eth.Contract(abiDerivative, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS);
                        const derivativeType = contract.methods.products(tokenId).arguments[0];
                        const marketplaceData = contractTracker.methods.getListing(address, tokenId);
                        tokens.push({
                            tokenAddress: address,
                            tokenId: Number(tokenId),
                            typeString: getDerivativeTypeFromNumber(Number(derivativeType)),
                            typeNumber: Number(derivativeType),
                            price: web3.utils.fromWei(Number(marketplaceData.arguments[1]), "ether"),
                            seller: marketplaceData.arguments[0].toString(),
                            image: "/AB_blood_group512px.png"
                        })
                    }
                }
                if (buttonIndex != 0) {
                    tokens = tokens.filter((item) => {
                        return item.typeNumber === buttonIndex
                    })
                }

                setTokensOnSale(tokens);
            }
        }
        getTokensOnSale();
    }, [buttonIndex, web3, account]);

    return (
        <AppContainer>
            <Section>
                <div key="title" className="title">
                    <h2>HeroChain Marketplace</h2>
                    <p>
                        Welcome to the marketplace of HeroChain
                    </p>
                </div>
                <div key="marketPlaceTypes" className="marketPlaceTypes">
                    {marketPlaceType.map((text, index) => {
                        return <Button onClick={handleButtonClick} text={text} key={index} blue={index === buttonIndex} index={index} />;
                    })}
                </div>
                {
                    tokensOnSale.length !== 0 ?
                        <div key="marketPlaces" className="marketPlaces">
                            {tokensOnSale.map(({ typeString, tokenId, price, image }, index) => {
                                return (
                                    <Link key={`marketplace-${index}`} href={`/marketplace/derivative/${tokenId}`} style={{ textDecoration: 'none' }}>
                                        <div key={`marketplace-${index}`} className="marketplace">
                                            <div className="image">
                                                <img src={image} alt="marketplace" />
                                            </div>
                                            <div className="name">
                                                <h4>{typeString}</h4>
                                                <BsThreeDots />
                                            </div>
                                            <h3>{tokenId.toString()}</h3>
                                            <div className="price-container">
                                                <h5 className="price">{price.toString()}</h5>
                                                <FaEthereum />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div> : <Spinner></Spinner>
                }

            </Section>
        </AppContainer>


    );
}

export default Marketplace;