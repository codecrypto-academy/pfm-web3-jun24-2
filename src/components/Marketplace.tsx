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

const marketplace1 = "/AB_blood_group512px.png";
const marketplace2 = "/AB_blood_group512px.png";
const marketplace3 = "/AB_blood_group512px.png";
const marketplace4 = "/AB_blood_group512px.png";
const marketplace5 = "/AB_blood_group512px.png";
const marketplace6 = "/AB_blood_group512px.png";
const marketplace7 = "/AB_blood_group512px.png";
const marketplace8 = "/AB_blood_group512px.png";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin: 0 6rem;
  margin-bottom: 5rem;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-direction: column;
    h2 {
      font-size: 3rem;
    }
    p {
      color: #7b7e86;
    }
  }
  .marketPlaceTypes {
    display: flex;
    justify-content: center;
    gap: 2rem;
    button:not(.blue) {
      color: black;
      border-color: #7b7e86;
    }
  }
  .marketPlaces {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    .marketplace {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 0.5rem;
      border-radius: 1rem;
      width: max-content;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      }
      .image {
        margin-bottom: 1rem;
      }
      .name {
        display: flex;
        color: #222222;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        h4 {
        }
      }
      .username {
        color: #555555;
        font-size: 0.8rem;
        padding: 0 1rem;
        margin-bottom: 0.5rem;
      }
      .price-container {
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        color: #02204e;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 2rem;
    .marketPlaceTypes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
    .marketPlaces {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;



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

    const getDerivativeTypeFromNumber = (derivativeType) => {
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
        console.log(buttonIndex)
        getTokensOnSale();
    }, [buttonIndex, web3, account]);
    // return (
    //     <p>This is the marketplace component</p>
    // )

    return (
        // <Section>
        //     <div key="title" className="title">
        //         <h2>HeroChain Marketplace</h2>
        //         <p>
        //             Welcome to the marketplace of HeroChain
        //         </p>
        //     </div>
        //     <div key="marketPlaceTypes" className="marketPlaceTypes">
        //         {marketPlaceType.map((text, index) => {
        //             return <Button onClick={handleButtonClick} text={text} key={index} blue={index === buttonIndex} index={index} />;
        //         })}
        //     </div>
        //     <div key="marketPlaces" className="marketPlaces">
        //         {marketPlaceData.map(({ image, name }, index) => {
        //             return (
        //                 <div key={`marketplace-${index}`} className="marketplace">
        //                     <div className="image">
        //                         <img src={image} alt="marketplace" />
        //                     </div>
        //                     <div className="name">
        //                         <h4>{name}</h4>
        //                         <BsThreeDots />
        //                     </div>
        //                     <h6 className="username">@koolkishansheth</h6>
        //                     <div className="price-container">
        //                         <h5 className="price">5.5ETH</h5>
        //                         <FaEthereum />
        //                     </div>
        //                 </div>
        //             );
        //         })}
        //     </div>
        // </Section>

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
                                <Link href={`/trace/${tokenId}`} style={{ textDecoration: 'none' }}>
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


    );
}

export default Marketplace;