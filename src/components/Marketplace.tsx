import { useWallet } from "./ConnectWalletButton";
import { useEffect } from "react";
import { abi as abiTracker } from "@/../../src/lib/contracts/BloodTracker";
import { abi as abiDerivative } from "@/../../src/lib/contracts/BloodDerivative";
import { abi as abiDonation } from "@/../../src/lib/contracts/BloodDonation";
import { BsThreeDots } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import Button from "./Button";
import ButtonActions from "./ButtonActions";
import { useState } from "react";
import { Spinner } from "./Spinner";
import Link from "next/link";
import Section from "./SectionMarketplace";
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
        price: string;
        priceEther: string;
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

    const getImageFromDerivative = (derivativeType: Number) => {
        switch (derivativeType) {
            case 1:
                return "/plasma.png"
            case 2:
                return "/erythrocytes.png"
            case 3:
                return "/plaquetes.png"
        }
    }

    useEffect(() => {
        const getTokensOnSale = async () => {
            var tokens: tokenInterface[] = [];
            if (web3) {
                for (const address of tokenAddresses) {
                    const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS);
                    const result = await contractTracker.methods.getTokensOnSale(address).call({ from: account })
                    for (const tokenId of result) {
                        const contract = new web3.eth.Contract(abiDerivative, process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS);
                        const derivativeType = await contract.methods.products(tokenId).arguments[0];
                        const marketplaceData = await contractTracker.methods.getListing(address, tokenId).call({ from: account });
                        console.log("derivativeType", derivativeType)
                        console.log("marketplaceData", marketplaceData)
                        tokens.push({
                            tokenAddress: process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS,
                            tokenId: Number(tokenId),
                            typeString: getDerivativeTypeFromNumber(Number(derivativeType)),
                            typeNumber: Number(derivativeType),
                            price: marketplaceData[0].toString(),
                            priceEther: web3.utils.fromWei(Number(marketplaceData[0]), "ether"),
                            seller: marketplaceData[1].toString(),
                            image: getImageFromDerivative(Number(derivativeType))
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

    const handleBuyButtonClick = async (tokenId: Number, price: string) => {
        if (web3) {
            console.log("Item buy", Number);
            const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS);
            await contractTracker.methods.buyItem(process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS, tokenId).send({ value: price, from: account, gas: '1000000', gasPrice: 1000000000 })
            console.log("Token selled")
            window.location.reload();
        }
    }

    const handleCancelButtonClick = async (tokenId: Number, price: string) => {
        if (web3) {
            const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS);
            await contractTracker.methods.cancelListing(process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS, tokenId).send({ from: account, gas: '1000000', gasPrice: 1000000000 })
            console.log("Token cancelled")
            window.location.reload()
        }
    }


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
                            <Link key={`marketplace`} href={`/marketplace/derivative/listItem`} style={{ textDecoration: 'none' }}>
                                <div key={`marketplace`} className="marketplace">
                                    <div className="image">
                                        <img src={"/addItem.png"} alt="marketplace" />
                                    </div>
                                    <div className="name">
                                        <h4>ADD ITEM</h4>
                                    </div>
                                    <div className="price-container">
                                    </div>
                                </div>
                            </Link>
                            {tokensOnSale.map(({ typeString, tokenId, price, priceEther, image, seller }, index) => {
                                return (
                                    // <Link key={`marketplace-${index}`} href={`/marketplace/derivative/${tokenId}`} style={{ textDecoration: 'none' }}>
                                    <div key={`marketplace-${index}`} className="marketplace">
                                        <div className="image">
                                            <img src={image} alt="marketplace" />
                                        </div>
                                        <div className="name">
                                            <h4>{`${typeString} ${tokenId}`}</h4>
                                        </div>
                                        <div className="name">
                                            <h5 className="price">{seller}</h5>
                                        </div>
                                        <div className="price-container">
                                            <h5 className="price">{priceEther}</h5>
                                            <FaEthereum />
                                        </div>
                                        <div className="price-container">
                                        </div>
                                        <div className="button-container-grid">
                                            <ButtonActions onClick={handleBuyButtonClick} text={"Buy"} blue={true} key={1} tokenId={tokenId} price={price} />
                                            {web3.utils.toChecksumAddress(seller) === web3.utils.toChecksumAddress(account) ?
                                                <ButtonActions onClick={handleCancelButtonClick} text={"Cancel"} blue={true} key={1} tokenId={tokenId} price={price} />
                                                :
                                                <ButtonActions text={"Cancel"} blue={false} key={2} tokenId={tokenId} price={price} />}

                                        </div>
                                    </div>
                                );
                            })}
                        </div> : <></>
                }
            </Section>
        </AppContainer>
    );
}

export default Marketplace;