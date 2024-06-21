// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Blood} from "./Blood.sol";

contract BloodTracker {
    error BloodTracker__NotOwner();
    error BloodTracker__IncorrectRole(Role required, Role yourRole);

    Blood bld;

    enum Role {
        DONATION_CENTER,
        LABORATORY,
        TRADER
    } //Otro enfoque seria con AccessControl
    enum Derivative {
        RAW,
        PLASMA,
        ERYTHROCYTES,
        PLATELETS
    }
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
    enum AnalysisResult {
        Negative,
        Positive
    }

    // Unidades de sangre y hemoderivados
    struct Product {
        uint256 tokenIdOrigin;
        Derivative derivative;
    }

    // Datos de donante
    struct Donor {
        BloodType bloodType; //No implementado
        uint256 balance;
    }

    // Datos de empresa
    struct Company {
        string name;
        string location;
        Role role;
    }

    mapping(uint256 tokenId => Product) public products;

    mapping(address donorWallet => Donor) public donors;

    mapping(address companyWallet => Company) public companies;

    event Donation(address indexed donor, uint256 tokenId);

    modifier tokenOwner(uint256 tokenId) {
        if (bld.ownerOf(tokenId) != msg.sender) revert BloodTracker__NotOwner();
        _;
    }

    modifier onlyRole(Role role) {
        if (companies[msg.sender].role != role) revert BloodTracker__IncorrectRole(role, companies[msg.sender].role);
        _;
    }

    constructor(address bldTokenAddress) {
        bld = Blood(bldTokenAddress);
    }

    // Función para registrar empresas
    function signUp(string memory _name, string memory _location, Role _role) external {
        require(bytes(companies[msg.sender].name).length == 0, "Already registered");
        companies[msg.sender] = Company(_name, _location, _role);
    }

    // Función principal para que los centros de extracción puedan crear una nueva donación
    function donate(address _from, address _to) external payable returns (uint256) {
        require(companies[msg.sender].role == Role.DONATION_CENTER, "Not donation center");
        // Obtenemos nuevo Id de token
        uint256 tokenId = nextTokenId++;
        // Sumamos los ethers al balance del donante
        donors[_from].balance += msg.value;
        // Creamos el token que representa la unidad de sangre
        bld.mint(_to, tokenId);
        // Guardamos los datos del token
        products[tokenId] = Product(0, Derivative.RAW);

        emit Donation(_from, tokenId);

        return tokenId;
    }

    // Función para analisar la sangre -- PENDIENTE DE MOMENTO
    // function analysis(uint _tokenId, AnalysisResult _result) external {
    //     require(_ownerOf(_tokenId) == msg.sender, "Not owner");
    //     require(companies[msg.sender].role == Role.LABORATORY, "Not laboratory");
    //     require(products[_tokenId].derivative == Derivative.RAW, "Not raw blood");
    //     if (_result == AnalysisResult.Positive){

    //     } else {
    //         _burn(_tokenId);
    //     }
    // }

    // Función para que los laboratorios puedan procesar las unidades de sangre en hemoderivados
    function process(uint256 _tokenId) external tokenOwner(_tokenId) onlyRole(Role.LABORATORY) returns (uint256, uint256, uint256) {
        uint256 idPlasma = createDerivative(_tokenId, Derivative.PLASMA);
        uint256 idErythrocyte = createDerivative(_tokenId, Derivative.ERYTHROCYTES);
        uint256 idPlatelet = createDerivative(_tokenId, Derivative.PLATELETS);

        bld.burn(_tokenId);

        return (idPlasma, idErythrocyte, idPlatelet);
    }

    // Función para que los traders puedan consumir la sangre
    function consume(uint256 _tokenId) external tokenOwner(_tokenId) onlyRole(Role.TRADER) {
        bld.burn(_tokenId);
    }

    // Función para generar hemoderivados
    function createDerivative(uint256 _tokenIdOrigen, Derivative _derivative) private returns (uint256) {
        uint256 tokenId = nextTokenId++;
        products[tokenId] = Product(_tokenIdOrigen, _derivative);
        bld.mint(msg.sender, tokenId);
        return tokenId;
    }
}
