
import { Derivative } from "@/lib/types"
import { TraceCard } from "./TraceCard"
import { FullTrace } from "@/app/trace/[id]/page"

interface TraceBranchProps {
    trace: NonNullable<FullTrace['donationTrace']>
    product: (typeof Derivative)[keyof typeof Derivative]
}

export function TraceBranch({trace, product}: TraceBranchProps){
    return <div className="flex flex-col">
        {trace.trace.map((value, key) => {
            return <TraceCard
                key={key}
                event={value.event}
                product={product}
                tokenId={trace.tokenId}
                owner={value.owner}
                blockNumber={value.blockNumber}
            ></TraceCard>
        })}
    </div> 
}