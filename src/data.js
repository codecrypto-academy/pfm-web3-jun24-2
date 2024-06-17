'use server'

/**
 * Las funciones en este fichero se ejecutan en el lado del servidor, en el backend.
 * Seguramente, los componentes que llamen funciones desde este fichero necesitarán 
 * la directiva 'use client' al inicio del fichero.
 */

export async function saludar(){
    console.log("Hola mundo")
}