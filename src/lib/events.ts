'use server'

import { Bytes, EventLog, Web3 } from "web3"
import { abi as abiTracker } from "./contracts/BloodTracker"
import { abi as abiDonation } from "./contracts/BloodDonation"
import { abi as abiDerivative } from "./contracts/BloodDerivative"

const web3 = new Web3(process.env.NETWORK_RPC)

const contractTracker = new web3.eth.Contract(abiTracker, process.env.BLD_TRACKER_CONTRACT_ADDRESS)
const contractDonation = new web3.eth.Contract(abiDonation, process.env.BLD_DONATION_CONTRACT_ADDRESS)
const contractDerivative = new web3.eth.Contract(abiDerivative, process.env.BLD_DERIVATIVE_CONTRACT_ADDRESS)

/**
 * Recupera el listado de las donaciones realizadas por un donante
 * @param address Dirección del donante
 * @returns Registro de donaciones realizadas por el donante
 */
export async function getDonations(address: string) {
    const donations = []
    const events = await contractTracker.getPastEvents('Donation', {
        filter: { donor: address },
        fromBlock: process.env.DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    }) as EventLog[]

    for (const event of events){
        //Consulta transacción para obtener address del centro y el value
        const {value, from} = await web3.eth.getTransaction(event.transactionHash as Bytes)
        //consulta tracker para obtener nombre y localización del centro
        const {name, location} = await contractTracker.methods.companies(from).call()
        //consulta bloque para obtener la hora
        const {timestamp} = await web3.eth.getBlock(event.blockHash)
        donations.push({
            donationCenter: name,
            location: location,
            datetime: new Date(Number(timestamp) * 1000),
            value: value
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
    return await contractDonation.getPastEvents('Transfer', {
        filter: { from: 0, to: address },
        fromBlock: process.env.DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    }) 
}

/**
 * Recupera el listado de los procesamientos realizados por un laboratorio
 * @param address Dirección del laboratorio
 * @returns Registro de procesamientos realizados por el laboratorio
 */
export async function getProcesses(address: string) {
    return await contractDonation.getPastEvents('Transfer', {
        filter: { from: address, to: 0 },
        fromBlock: process.env.DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    })
}

/**
 * Recupera la trazabilidad de un token de donación o de derivado.
 * @param tokenId Id del token que se desea la traza. Puede ser de una donación o un derivado
 * @returns Traza completa del evento Transfer
 */
export async function getTraceFromDonation(tokenId: number){
    return await contractDonation.getPastEvents('Transfer', {
        filter: { tokenId: tokenId },
        fromBlock: process.env.DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    })
}

/**
 * Recupera la trazabilidad de un token de donación o de derivado.
 * @param tokenId Id del token que se desea la traza. Puede ser de una donación o un derivado
 * @returns Traza completa del evento Transfer
 */
export async function getTraceFromDerivative(tokenId: number, fromBlock = Number(process.env.DEPLOYMENT_BLOCK)){
    return await contractDerivative.getPastEvents('Transfer', {
        filter: { tokenId: tokenId },
        fromBlock: fromBlock,
        toBlock: 'latest'
    })
}

/**
 * Recupera la trazabilidad completa de una donación a partir de la donación
 * @param tokenId Id de la donación original
 */
export async function getFullTraceFromDonation(tokenId: number) {
    const traceFromDonation = await getTraceFromDonation(tokenId)

    //Número del bloque en el que se hizo el procesamiento
    // const processBlock = traceFromDonation.find(t => {
    //      return t.returnValues.to === 0
    // }) 

    return traceFromDonation
    // if (!processBlock) return traceFromDonation

    // const traceFromProcess = await getTraceFromDerivative(tokenId, processBlock.blockNumber)

    // return [...traceFromDonation, ...traceFromProcess]
}


export async function getFullTraceFromDerivative(tokenId: number) {
    // return contractDerivative.
    // getFullTraceFromDonation(tokenIdOrigin)


    const donaciones = await getDonations('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    console.log(donaciones)

    // const data = await web3.eth.getTransaction('0x39de9cb4ab6f7ae94db477a18a8178274ae5d4181c353bcd4c319615dc73ac5f')
    // console.log(data)
}
