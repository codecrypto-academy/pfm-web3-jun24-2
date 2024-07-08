// src/components/DonorDashboard.tsx
import React from 'react';

interface Donation {
    id: number;
    token: string;
    destination: string;
}

interface Center {
    id: number;
    name: string;
}

interface DonorDashboardProps {
    donations: Donation[];
    centers: Center[];
}

const DonorDashboard: React.FC<DonorDashboardProps> = ({ donations, centers }) => {
    return (
        <div>
            {donations.length === 0 ? (
                <div>
                    <h2>Centros de Donación Disponibles</h2>
                    <ul>
                        {centers.map(center => (
                            <li key={center.id}>{center.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>Historial de Donaciones</h2>
                    <ul>
                        {donations.map(donation => (
                            <li key={donation.id}>
                                Token: {donation.token}, Destino: {donation.destination}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DonorDashboard;
