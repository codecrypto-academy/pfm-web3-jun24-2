// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBlood {
    // Tipos de hemoderivados
    enum Derivative {
        IDLE,
        PLASMA,
        ERYTHROCYTES,
        PLATELETS
    }

    // Grupos sanguineos
    enum BloodType {
        IDLE,
        ABp,
        ABm,
        Ap,
        Am,
        Bp,
        Bm,
        Op,
        Om
    }

    // Resultados de analisis
    enum AnalysisResult {
        IDLE,
        Negative,
        Positive
    }
}
