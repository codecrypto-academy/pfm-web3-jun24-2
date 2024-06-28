// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IBlood} from "./IBlood.sol";

contract BloodDerivative is IBlood, ERC721, ERC721Burnable, ERC721Enumerable, Ownable {
    uint256 private nextTokenId;

    // Unidades de sangre y hemoderivados
    struct Product {
        uint256 tokenIdOrigin;
        Derivative derivative;
    }

    mapping(uint256 tokenId => Product) public products;

    constructor()
        // address initialOwner
        ERC721("Derivative", "DERIV")
        Ownable(msg.sender)
    {}

    function mint(address to, uint256 fromTokenId, Derivative _derivative) external onlyOwner returns (uint256 tokenId) {
        tokenId = nextTokenId;
        super._safeMint(to, tokenId);
        nextTokenId++;
        // Guardamos los datos del token
        products[tokenId] = Product(fromTokenId, _derivative);
    }

    function _increaseBalance(address account, uint128 amount) internal virtual override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, amount);
    }

    function _update(address to, uint256 tokenId, address auth) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
