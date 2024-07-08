export const getDonationHistory = async (account: string) => {
    // Lógica para obtener el historial de donaciones desde la blockchain
    // Esto dependerá de cómo esté estructurada tu blockchain y contratos inteligentes
    return [
        // Ejemplo de datos de historial de donaciones
        { id: 1, token: "0xToken1", destination: "Hospital A" },
        { id: 2, token: "0xToken2", destination: "Laboratorio B" }
    ];
};

export const getDonationCenters = async () => {
    // Lógica para obtener los centros de donación disponibles desde la blockchain
    // Esto dependerá de cómo esté estructurada tu blockchain y contratos inteligentes
    return [
        // Ejemplo de datos de centros de donación
        { id: 1, name: "Centro de Donación A" },
        { id: 2, name: "Centro de Donación B" }
    ];
};
