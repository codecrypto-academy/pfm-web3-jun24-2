// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBlood {

    // Tipos de hemoderivados
    enum Derivative {
        PLASMA,
        ERYTHROCYTES,
        PLATELETS
    }

    // Grupos sanguineos
    enum BloodType {
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
        Negative,
        Positive
    }
}