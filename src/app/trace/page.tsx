'use client'
import { getFullTraceFromDerivative } from "@/lib/events";

export default function () {
    return <div>
        <button onClick={() => getFullTraceFromDerivative(0)}>Soy un boton</button>
    </div>
}