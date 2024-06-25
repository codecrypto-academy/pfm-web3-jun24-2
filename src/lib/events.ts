'use server'

import {Web3} from "web3"
import BloodTracker from "../../foundry/out/Donation.sol/BloodTracker.json"

const web3 = new Web3(process.env.NETWORK_RPC)

const contract = new web3.eth.Contract(BloodTracker.abi, process.env.BLD_CONTRACT_ADDRESS)

/**
 * Recupera el listado de las donaciones realizadas por un donante
 * @param address Dirección del donante
 * @returns Registro de donaciones realizadas por el donante
 */
export async function getDonations(address: string) {
    return await contract.getPastEvents('Donation', {
        filter: { donor: address },
        fromBlock: process.env.DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    })
}

/**
 * Recupera el listado de las extracciones realizadas por un centro de extracción
 * @param address Dirección del centro de extracción
 * @returns Registro de extracciones realizadas por el centro
 */
export async function getExtractions(address: string) {
    return await contract.getPastEvents('Transfer', {
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
    return await contract.getPastEvents('Transfer', {
        filter: { from: address, to: 0 },
        fromBlock: process.env.DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    })
}

export async function getTraceFromTokenId(tokenId: number){
    return await contract.getPastEvents('Transfer', {
        filter: { tokenId: tokenId },
        fromBlock: process.env.DEPLOYMENT_BLOCK,
        toBlock: 'latest'
    })
}

/**
 * Recupera la trazabilidad completa de una donación a partir de la donación
 * @param tokenId Id de la donación original
 */
export async function getFullTraceFromDonation(tokenId: number) {
    const traceFromDonation = await getTraceFromTokenId(tokenId)

    //Número del bloque en el que se hizo el procesamiento
    const processBlock = traceFromDonation.find(t => {
         return t.returnValues.to === 0
    }) 

    const traceFromProcess = await contract.getPastEvents('Transfer', {
        filter: { tokenId: tokenId },
        fromBlock: processBlock,
        toBlock: 'latest'
    })
}


export async function getFullTraceFromDerivative(tokenId: number) {
    // Obtenemos el tokenIdOrigin
    // getFullTraceFromDonation(tokenIdOrigin)
}
