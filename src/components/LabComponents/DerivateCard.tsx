import { Derivative } from "@/lib/types"
import Link from "next/link"

interface DerivateCardProps {
    tokenId: number
    product: Derivative
    timestamp: Date
    tokenIdOrigin: number
}

const productText = [undefined, 'Plasma', 'Erythrocytes', 'Platelets', 'Blood']

export function DerivateCard ({tokenId, product, timestamp, tokenIdOrigin}: DerivateCardProps) {
   return <div className="max-w-sm p-6 bg-gray-400 border border-gray-200 rounded-lg shadow flex flex-col items-start gap-5">
        <div className="flex flex-row items-center gap-3">   
             {product === Derivative.Plasma && <PlasmaIcon/>}
             {product === Derivative.Erythrocytes && <ErythrocytesIcon/>}
             {product === Derivative.Platelets && <PlateletsIcon/>}
            <h2>{productText[product]} #{tokenId}</h2>
        </div>
    
        <h3 className="font-normal">
            Processing date: {timestamp.toISOString()}
        </h3>

        <Link href={`/trace/${tokenIdOrigin}`} className="inline-flex font-medium items-center text-blue-600 hover:underline">
            View traceability from donation #{tokenIdOrigin}
            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
            </svg>
        </Link>

        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Place for sell
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
    </div>
    
}


function PlasmaIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="w-10 h-10 text-gray-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" />
        <path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" /><path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" />
    </svg>
}

function ErythrocytesIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="w-10 h-10 text-gray-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /><path d="M12 7v-4" /><path d="M11 3h2" />
        <path d="M15.536 8.464l2.828 -2.828" /><path d="M17.657 4.929l1.414 1.414" /><path d="M17 12h4" />
        <path d="M21 11v2" /><path d="M15.535 15.536l2.829 2.828" /><path d="M19.071 17.657l-1.414 1.414" />
        <path d="M12 17v4" /><path d="M13 21h-2" /><path d="M8.465 15.536l-2.829 2.828" />
        <path d="M6.343 19.071l-1.413 -1.414" /><path d="M7 12h-4" /><path d="M3 13v-2" /><path d="M8.464 8.464l-2.828 -2.828" />
        <path d="M4.929 6.343l1.414 -1.413" />
    </svg>
}

function PlateletsIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        className="w-10 h-10 text-gray-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 4l-4 2v5l4 2l4 -2v-5z" />
        <path d="M12 11l4 2l4 -2v-5l-4 -2l-4 2" /><path d="M8 13v5l4 2l4 -2v-5" />
    </svg>
}


