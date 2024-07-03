
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

export interface EventTrace {
    blockNumber: number
    event: EventType
    owner: Address
    name: string
    location: string
    timestamp: Date
}

export interface ProductTrace {
    tokenId: number
    trace: EventTrace[]
}

export enum Derivative {
    Plasma = 1,
    Erythrocytes = 2,
    Platelets = 3,
    Blood = 4
}