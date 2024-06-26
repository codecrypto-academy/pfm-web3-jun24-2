// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Blood is ERC721, ERC721Enumerable, Ownable {
    uint256 private nextTokenId;

    constructor()
        // address initialOwner
        ERC721("Blood", "BLD")
        Ownable(msg.sender)
    {}

    function burn(uint256 tokenId) external onlyOwner {
        super._burn(tokenId);
    }

    function mint(address to) external onlyOwner returns (uint256 tokenId) {
        tokenId = nextTokenId;
        super._safeMint(to, tokenId);
        nextTokenId++;
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
