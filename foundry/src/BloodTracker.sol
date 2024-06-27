// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {BloodDonation} from "./BloodDonation.sol";
import {BloodDerivative} from "./BloodDerivative.sol";
import {Marketplace} from "./Marketplace.sol";
import {IBlood} from "./IBlood.sol";

contract BloodTracker is IBlood, Marketplace {
    error BloodTracker__NotOwner();
    error BloodTracker__IncorrectRole(Role required, Role yourRole);

    BloodDonation bld;
    BloodDerivative der;

    enum Role {
        NO_REGISTERED,
        DONATION_CENTER,
        LABORATORY,
        TRADER
    } //Otro enfoque seria con AccessControl

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

    mapping(address donorWallet => Donor) public donors;

    mapping(address companyWallet => Company) public companies;

    event Donation(address indexed donor, uint256 indexed tokenId);

    modifier tokenOwnerBld(uint256 tokenId) {
        if (bld.ownerOf(tokenId) != msg.sender) revert BloodTracker__NotOwner();
        _;
    }

    modifier onlyRole(Role role) {
        if (companies[msg.sender].role != role) revert BloodTracker__IncorrectRole(role, companies[msg.sender].role);
        _;
    }

    constructor(address bldTokenAddress, address derTokenAddress) {
        bld = BloodDonation(bldTokenAddress);
        der = BloodDerivative(derTokenAddress);
    }

    // Función para registrar empresas
    function signUp(string memory _name, string memory _location, Role _role) external onlyRole(Role.NO_REGISTERED) {
        companies[msg.sender] = Company(_name, _location, _role);
    }

    // Función principal para que los centros de extracción puedan crear una nueva donación
    function donate(address _from) external payable onlyRole(Role.DONATION_CENTER) returns(uint256) {
        // Sumamos los ethers al balance del donante
        donors[_from].balance += msg.value;
        // Creamos el token que representa la unidad de sangre
        uint256 tokenId = bld.mint(msg.sender);

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
    function process(uint256 _tokenId) external tokenOwnerBld(_tokenId) onlyRole(Role.LABORATORY) {
        der.mint(msg.sender, _tokenId, Derivative.PLASMA);
        der.mint(msg.sender, _tokenId, Derivative.ERYTHROCYTES);
        der.mint(msg.sender, _tokenId, Derivative.PLATELETS);

        bld.burn(_tokenId);
    }

    ///////////////////////////
    ////////Marketplace////////
    ///////////////////////////

    // Functions override to apply roles to it
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) public override onlyRole(Role.LABORATORY) {
        super.listItem(nftAddress, tokenId, price);
    }

    function buyItem(
        address nftAddress,
        uint256 tokenId // isNotOwner(nftAddress, tokenId, msg.sender)
    ) public payable override onlyRole(Role.TRADER) {
        super.buyItem(nftAddress, tokenId);
    }
}
