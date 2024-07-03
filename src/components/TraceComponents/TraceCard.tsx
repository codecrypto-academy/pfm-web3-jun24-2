import { Derivative, EventTrace } from "@/lib/types"

interface TraceCardProps {
    tokenId: number
    product: Derivative
    trace: EventTrace
}

const productText = [undefined, 'Plasma', 'Erythrocytes', 'Platelets', 'Blood']

export function TraceCard({product, tokenId, trace}: TraceCardProps){
    return  <div className="
        block max-w-lg p-6 
        bg-gray-400 
        border border-gray-900 rounded-2xl shadow 
        hover:bg-gray-500
        m-3">

        <h5 className="mb-2 text-xl font-bold tracking-tight flex flex-row justify-between">
            <span>{trace.event}</span><span>{formatDate(trace.timestamp)}</span>
        </h5>
        <p>{productText[Number(product)]}: <b>#{String(tokenId)}</b></p>
        <p>Owner: {trace.owner}</p>
        <p>Company: {trace.name}</p>
        <p>Location: {trace.location}</p>
        <p>Block: {trace.blockNumber}</p>
    </div>
}

function formatDate(date: Date) {
    // Extraer componentes de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son base 0, así que sumamos 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Construir la cadena de formato YYYY-MM-DD HH:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  