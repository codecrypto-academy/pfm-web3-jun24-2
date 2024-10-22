// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {BloodDonation} from "./BloodDonation.sol";
import {BloodDerivative} from "./BloodDerivative.sol";
import {Marketplace} from "./Marketplace.sol";
import {IBlood} from "./IBlood.sol";

contract BloodTracker is IBlood, Marketplace {
    error BloodTracker__NotOwner();
    error BloodTracker__IncorrectRole(Role required, Role yourRole);
    error BloodTracker__AddressAlreadyRegistered();
    error BloodTracker__RoleNotAdmitted();
    error BloodTracker__MinimumDonationFeeNotMet();

    BloodDonation bld;
    BloodDerivative der;
    uint256 constant MINIMUM_DONATION_FEE = 0.001 ether;

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

    event Donation(
        address indexed donor,
        address indexed center,
        uint256 indexed tokenId,
        uint256 value
    );

    modifier tokenOwnerBld(uint256 tokenId) {
        if (bld.ownerOf(tokenId) != msg.sender) revert BloodTracker__NotOwner();
        _;
    }

    modifier onlyRole(Role role) {
        if (companies[msg.sender].role != role)
            revert BloodTracker__IncorrectRole(
                role,
                companies[msg.sender].role
            );
        _;
    }

    modifier uniqueAddress(address addr) {
        if (
            companies[addr].role != Role.NO_REGISTERED ||
            donors[addr].bloodType != BloodType.IDLE
        ) revert BloodTracker__AddressAlreadyRegistered();
        _;
    }

    constructor(address bldTokenAddress, address derTokenAddress) {
        bld = BloodDonation(bldTokenAddress);
        der = BloodDerivative(derTokenAddress);
    }

    // Función para registrar empresas
    function signUp(
        string memory _name,
        string memory _location,
        Role _role
    ) external uniqueAddress(msg.sender) onlyRole(Role.NO_REGISTERED) {
        if (_role == Role.NO_REGISTERED) revert BloodTracker__RoleNotAdmitted();
        companies[msg.sender] = Company(_name, _location, _role);
    }

    // Función principal para que los centros de extracción puedan crear una nueva donación
    function donate(
        address _from
    )
        external
        payable
        onlyRole(Role.DONATION_CENTER)
        uniqueAddress(_from)
        returns (uint256)
    {
        if (msg.value < MINIMUM_DONATION_FEE) {
            revert BloodTracker__MinimumDonationFeeNotMet();
        }
        // Sumamos los ethers al balance del donante
        donors[_from].balance += msg.value;
        // Creamos el token que representa la unidad de sangre
        uint256 tokenId = bld.mint(msg.sender);

        emit Donation(_from, msg.sender, tokenId, msg.value);

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
    function process(
        uint256 _tokenId
    )
        external
        tokenOwnerBld(_tokenId)
        onlyRole(Role.LABORATORY)
        returns (uint256, uint256, uint256)
    {
        uint256 plasmaId = der.mint(msg.sender, _tokenId, Derivative.PLASMA);
        uint256 erythrocytesId = der.mint(
            msg.sender,
            _tokenId,
            Derivative.ERYTHROCYTES
        );
        uint256 plateletsId = der.mint(
            msg.sender,
            _tokenId,
            Derivative.PLATELETS
        );

        bld.updateDonation(_tokenId, plasmaId, erythrocytesId, plateletsId);

        return (plasmaId, erythrocytesId, plateletsId);
    }

    ///////////////////////////
    ////////Marketplace////////
    ///////////////////////////

    // Functions override to apply roles to it
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) public override {
        Role role = companies[msg.sender].role;
        if (role != Role.LABORATORY && role != Role.TRADER)
            revert BloodTracker__IncorrectRole(
                role,
                companies[msg.sender].role
            );
        super.listItem(nftAddress, tokenId, price);
    }

    function buyItem(
        address nftAddress,
        uint256 tokenId // isNotOwner(nftAddress, tokenId, msg.sender)
    ) public payable override onlyRole(Role.TRADER) {
        super.buyItem(nftAddress, tokenId);
    }

    ///////////////////////////
    ////////Getters////////
    ///////////////////////////

    function getMinimumDonationFee() public pure returns (uint256) {
        return MINIMUM_DONATION_FEE;
    }
}
