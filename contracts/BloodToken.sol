// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BloodToken is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public tokenMetadata;

    constructor() ERC721("BloodToken", "BLD") {}

    function mint(address to, string memory metadata) public onlyOwner {
        uint256 tokenId = nextTokenId;
        _mint(to, tokenId);
        tokenMetadata[tokenId] = metadata;
        nextTokenId++;
    }

    function getTokenMetadata(uint256 tokenId) public view returns (string memory) {
        return tokenMetadata[tokenId];
    }
}
