'use client'

import { Web3 } from "web3"
import { abi as abiTracker } from "./contracts/BloodTracker"
import { abi as abiDonation } from "./contracts/BloodDonation"
import { abi as abiDerivative } from "./contracts/BloodDerivative"
import { Address, DonationEventLog, EventTrace, EventType, TransferEventLog } from "./types"
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const web3 = new Web3(window?.ethereum)
// const web3 = new Web3("https://testnet.tscscan.io/testrpc")

const contractTracker = new web3.eth.Contract(abiTracker, process.env.NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS)
const contractDonation = new web3.eth.Contract(abiDonation, process.env.NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS)
const contractDerivative = new web3.eth.Contract(abiDerivative, process.env.NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS)

/**
 * Recupera el listado de las donaciones realizadas por un donante
 * @param address Dirección del donante
 * @returns Registro de donaciones realizadas por el donante
 */
export async function getDonations(address: string) {
    const donations = []
    const events = await contractTracker.getPastEvents('Donation', {
        filter: { donor: address },
        fromBlock: process.env.NEXT_PUBLIC_DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    }) as DonationEventLog[]

    for (const event of events) {
        //consulta tracker para obtener nombre y localización del centro
        const { name, location } = await contractTracker.methods.companies(event.returnValues.center).call()
        //consulta bloque para obtener la hora
        const { timestamp } = await web3.eth.getBlock(event.blockHash)
        donations.push({
            donationId: event.returnValues.tokenId,
            donationCenter: event.returnValues.center,
            centerName: name,
            centerLocation: location,
            datetime: new Date(Number(timestamp) * 1000),
            value: event.returnValues.value
        })
    }
    return donations
}

/**
 * Recupera el listado de las extracciones realizadas por un centro de extracción
 * @param address Dirección del centro de extracción
 * @returns Registro de extracciones realizadas por el centro
 */
export async function getExtractions(address: string) {
    const donations = []
    const events = await contractTracker.getPastEvents('Donation', {
        filter: { center: address },
        fromBlock: process.env.NEXT_PUBLIC_DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    }) as DonationEventLog[]

    for (const event of events) {
        //consulta bloque para obtener la hora
        const { timestamp } = await web3.eth.getBlock(event.blockHash)
        donations.push({
            donationId: event.returnValues.tokenId,
            donor: event.returnValues.donor,
            datetime: new Date(Number(timestamp) * 1000),
            value: event.returnValues.value
        })
    }
    return donations
}

/**
 * Recupera el listado de los procesamientos realizados por un laboratorio
 * @param address Dirección del laboratorio
 * @returns Registro de procesamientos realizados por el laboratorio
 */
export async function getProcesses(address: string) {
    return await contractDonation.getPastEvents('Transfer', {
        filter: { from: address, to: ZERO_ADDRESS },
        fromBlock: process.env.NEXT_PUBLIC_DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    })
}

/**
 * Recupera la trazabilidad de un token de donación o de derivado.
 * @param tokenId Id del token que se desea la traza. Puede ser de una donación o un derivado
 * @returns Traza completa del evento Transfer
 */
export async function getEventsFromDonation(tokenId: number) {
    const events = await contractDonation.getPastEvents('Transfer', {
        filter: { tokenId: tokenId },
        fromBlock: process.env.NEXT_PUBLIC_DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    }) as TransferEventLog[]

    return formatEvent(events)
}

/**
 * Recupera la trazabilidad de un token de donación o de derivado.
 * @param tokenId Id del token que se desea la traza. Puede ser de una donación o un derivado
 * @returns Traza completa del evento Transfer
 */
export async function getEventsFromDerivative(tokenId: number, fromBlock: number = Number(process.env.NEXT_PUBLIC_DEPLOYMENT_BLOCK)){
    const events = await contractDerivative.getPastEvents('Transfer', {
        filter: { tokenId: tokenId },
        fromBlock: fromBlock,
        toBlock: 'latest'
    }) as TransferEventLog[]

    return formatEvent(events)
}

/**
 * Recupera la trazabilidad completa de una donación a partir de la donación
 * @param tokenId Id de la donación original
 */
export async function getTraceFromDonation(tokenId: number) {
    const donationTrace = await getEventsFromDonation(tokenId)

    // Si no encuentra eventos entonces es que la donación no existe 
    if (!donationTrace.length) return { donationTrace: undefined }

    const donation = {
        tokenId: tokenId,
        trace: donationTrace
    }

    // Número del bloque en el que se hizo el procesamiento
    const processBlock = donationTrace.find(t => {
        return t.event === EventType.Consummation
    })

    // Si no hay bloque de procesamiento, salimos
    if (!processBlock) return { donationTrace: donation }

    // Consultamos los Ids de los derivados
    const { plasmaId, erythrocytesId, plateletsId } = await contractDonation.methods.donations(tokenId).call()

    const plasmaTrace = await getEventsFromDerivative(plasmaId as number, Number(processBlock.blockNumber))
    const erythrocytesTrace = await getEventsFromDerivative(erythrocytesId as number, Number(processBlock.blockNumber))
    const plateletsTrace = await getEventsFromDerivative(plateletsId as number, Number(processBlock.blockNumber))

    return {
        donationTrace: donation,
        plasmaTrace: {
            tokenId: Number(plasmaId),
            trace: plasmaTrace
        },
        erythrocytesTrace: {
            tokenId: Number(erythrocytesId),
            trace: erythrocytesTrace
        },
        plateletsTrace: {
            tokenId: Number(plateletsId),
            trace: plateletsTrace
        }
    }
}

export async function getTokenIdOriginFromDerivative(tokenId: number) {
    const { tokenIdOrigin } = await contractDerivative.methods.products(tokenId).call()
    if (!tokenIdOrigin) return
    return await getTraceFromDonation(tokenIdOrigin as number)
}

async function formatEvent(events: TransferEventLog[]): Promise<EventTrace[]> {
    return await Promise.all(events.map(async e => {
        let event, owner: Address
        if (e.returnValues.from === ZERO_ADDRESS) {
            event = EventType.Generation
            owner = e.returnValues.to
        } else if (e.returnValues.to === ZERO_ADDRESS) {
            event = EventType.Consummation
            owner = e.returnValues.from
        } else {
            event = EventType.Transfer
            owner = e.returnValues.to
        }
        const blockNumber = Number(e.blockNumber)
        const { timestamp } = await web3.eth.getBlock(e.blockHash)
        const { name, location } = await contractTracker.methods.companies(owner).call()
        return {
            blockNumber: blockNumber,
            event: event,
            owner: owner,
            name: name,
            location: location,
            timestamp: new Date(Number(timestamp) * 1000)
        }
    }))
}