import { useWallet } from "../ConnectWalletButton";
import { useState, useEffect } from "react";
import styles from "../RoleHome.module.css";
import { useRouter } from "next/navigation";
const functionsTrader = [
    { name: "Traceability", img: "/cadena-de-bloques.png", path: "/trace" },
    { name: "Marketplace", img: "/shoppingCart.png", path: "/marketplace" },
];

function Trader() {
    const { account, web3 } = useWallet();
    const [balance, setBalance] = useState<Number>(0);
    const router = useRouter();

    const handleClick = (path: string) => {
        router.push(path);
    }
    return (
        <>
            <div className={styles.rolesGrid}>
                {functionsTrader.map((functionTrader) => (
                    <div
                        key={functionTrader.name}
                        className={styles.roleBox}
                        onClick={() => handleClick(functionTrader.path)}>
                        <img src={functionTrader.img} alt={functionTrader.name} className={styles.roleImg} />
                        <div className={styles.roleName}>{functionTrader.name}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Trader;