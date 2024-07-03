
import { Derivative, ProductTrace } from "@/lib/types"
import { TraceCard } from "./TraceCard"

interface TraceBranchProps {
    trace: ProductTrace
    product: Derivative
}

export function TraceBranch({trace, product}: TraceBranchProps){
    return <div className="flex flex-col">
        {trace.trace.map((value, key) => {
            return <TraceCard
                key={key}
                product={product}
                tokenId={trace.tokenId}
                trace={value}
            ></TraceCard>
        })}
    </div> 
}