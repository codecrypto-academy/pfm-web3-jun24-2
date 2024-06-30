import { EventType, Derivative, Address } from "@/lib/types"

interface TraceCardPros {
    event: EventType
    product: (typeof Derivative)[keyof typeof Derivative]
    tokenId: number
    owner: Address
    blockNumber: number
}

const productText = ['Plasma', 'Erythrocytes', 'Platelets', 'Blood']

export function TraceCard({event, product, tokenId, owner, blockNumber}: TraceCardPros){
    return  <div className="
        block max-w-lg p-6 
        bg-gray-400 
        border border-gray-200 rounded-2xl shadow 
        hover:bg-gray-500
        m-3">

        <h5 className="mb-2 text-xl font-bold tracking-tight">{event}</h5>
        <p>Product: {productText[Number(product)]}</p>
        <p>ID: {String(tokenId)}</p>
        <p>Owner: {owner}</p>
        <p>Block: {blockNumber}</p>
    </div>
}