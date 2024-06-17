// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";


contract Donation is ERC721 {
    uint256 private _nextTokenId;

    enum Derivatives { RAW, PLASMA, ERYTHROCYTES, PLATELETS }

    struct Data {
        uint256 tokenId;
        Derivatives derivative;
        bool consumed;
    }

    // De momento almacenamos los balances a los que tienen derecho los donantes
    // Luego se tendrá que habilitar una forma de que puedan transferir los fondos a una ONG registrada
    mapping(address => uint) public balances; 

    mapping(uint => Data) public datas;

    constructor() ERC721("BLOOD", "BLD") {}

    function donar(address _from, address _to) external payable returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        balances[_from] = msg.value;
        _mint(_to, tokenId);

        datas[tokenId] = Data(0, Derivatives.RAW, false);

        return tokenId;
    }

    function process(uint256 _tokenId) external returns (uint256, uint256, uint256)  {
        require(_ownerOf(_tokenId) == msg.sender, "Not owner");
        require(!datas[_tokenId].consumed, "Already processed");
        uint256 idPlasma = generate(_tokenId, Derivatives.PLASMA);
        uint256 idErythrocyte = generate(_tokenId, Derivatives.ERYTHROCYTES);
        uint256 idPlatelet = generate(_tokenId, Derivatives.PLATELETS);

        datas[_tokenId].consumed = true;

        return (idPlasma, idErythrocyte, idPlatelet);
    }

    function consume(uint _tokenId) external {
        require(_ownerOf(_tokenId) == msg.sender, "Not owner");
        require(!datas[_tokenId].consumed, "Already consumed");
        datas[_tokenId].consumed = true;
    }

    function generate(uint _tokenIdOrigen, Derivatives _derivative) private returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        datas[tokenId] = Data(_tokenIdOrigen, _derivative, false);
        _mint(msg.sender, tokenId);

        return tokenId;
    }
}




