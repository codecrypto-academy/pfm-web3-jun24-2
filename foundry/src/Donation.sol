// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BloodTracker is ERC721 {
    uint256 private _nextTokenId;

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

    constructor() ERC721("BLOOD", "BLD") {}

    // Función para registrar empresas
    function signUp(string memory _name, string memory _location, Role _role) external {
        require(bytes(companies[msg.sender].name).length == 0, "Already registered");
        companies[msg.sender] = Company(_name, _location, _role);
    }

    // Función principal para que los centros de extracción puedan crear una nueva donación
    function donate(address _from) external payable returns (uint256) {
        require(companies[msg.sender].role == Role.DONATION_CENTER, "Not donation center");
        // Obtenemos nuevo Id de token
        uint256 tokenId = _nextTokenId++;
        // Sumamos los ethers al balance del donante
        donors[_from].balance += msg.value;
        // Creamos el token que representa la unidad de sangre
        _safeMint(msg.sender, tokenId);
        // Guardamos los datos del token
        products[tokenId] = Product(0, Derivative.RAW);

        emit Donation(_from, tokenId);

        return tokenId;
    }

    //Funcion para transferir del CENTRO al LABORATORIO. Evitando que se envie a otras compañias.
    //override de las funciones transfer y safeTransfer

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
    function process(uint256 _tokenId) external returns (uint256, uint256, uint256) {
        require(_ownerOf(_tokenId) == msg.sender, "Not owner");
        require(companies[msg.sender].role == Role.LABORATORY, "Not laboratory");
        uint256 idPlasma = createDerivative(_tokenId, Derivative.PLASMA);
        uint256 idErythrocyte = createDerivative(_tokenId, Derivative.ERYTHROCYTES);
        uint256 idPlatelet = createDerivative(_tokenId, Derivative.PLATELETS);

        _burn(_tokenId);

        return (idPlasma, idErythrocyte, idPlatelet);
    }

    //MakerPlace:
    //Poner en venta
    //Comprar lo que esté en venta

    // Función para que los traders puedan consumir el hemoderivado
    function consume(uint256 _tokenId) external {
        require(_ownerOf(_tokenId) == msg.sender, "Not owner");
        require(companies[msg.sender].role == Role.TRADER, "Not trader");
        _burn(_tokenId);
    }

    // Función para generar hemoderivados
    function createDerivative(uint256 _tokenIdOrigen, Derivative _derivative) private returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        products[tokenId] = Product(_tokenIdOrigen, _derivative);
        _mint(msg.sender, tokenId);

        return tokenId;
    }
}
