
import { EventLog } from "web3"

export type Address = `0x${string}`

// Resultado del evento Donation en BloodTracker
export type DonationEventValues = {
    donor: Address
    center: Address
    tokenId: bigint
    value: bigint
}
export interface DonationEventLog extends EventLog {
    returnValues: DonationEventValues
}

// Resultado del evento Transfer en el estander ERC721
export type TransferEventValues = {
    from: Address
    to: Address
    tokenId: bigint
}
export interface TransferEventLog extends EventLog {
    returnValues: TransferEventValues
}

export enum EventType {
    Generation = 'Generation',
    Transfer = 'Transfer',
    Consummation = 'Consumation'
}

export const Derivative = {
    Plasma: 0n,
    Erythrocytes: 1n,
    Platelets: 2n,
    Blood: 3n
} as const