'use client'

import { Spinner } from "@/components/Spinner"
import { getTraceFromDonation } from "@/lib/events"
import { useEffect, useState } from "react"
import { TraceBranch } from "@/components/TraceComponents/TraceBranch"
import { Derivative } from "@/lib/types"

type FullTrace = Awaited<ReturnType<typeof getTraceFromDonation>>

export default function ({params}: {params: {id: string}}){
    const tokenId = params.id
    const [trace, setTrace] = useState<FullTrace>({donationTrace: undefined})
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getTraceFromDonation(Number(tokenId))
            .then((res) => {
                setTrace(res)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <Spinner></Spinner>
    if (trace.donationTrace === undefined) return <p className="flex flex-col items-center justify-center flex-1 text-3xl">Donation not found</p>

    return <div className="flex flex-col items-center">
        <TraceBranch trace={trace.donationTrace} product={Derivative.Blood}></TraceBranch>
        {trace.plasmaTrace && <div className="grid grid-cols-3">
            <TraceBranch trace={trace.plasmaTrace} product={Derivative.Plasma}></TraceBranch>    
            <TraceBranch trace={trace.erythrocytesTrace} product={Derivative.Erythrocytes}></TraceBranch>    
            <TraceBranch trace={trace.plateletsTrace} product={Derivative.Platelets}></TraceBranch>    
        </div>}
    </div>
}