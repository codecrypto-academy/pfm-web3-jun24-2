// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IBlood} from "./IBlood.sol";

contract BloodDonation is ERC721, ERC721Burnable, ERC721Enumerable, Ownable {
    uint256 private nextTokenId;

    struct Donation {
        uint256 plasmaId;
        uint256 erythrocytesId;
        uint256 plateletsId;
    }

    mapping(uint256 tokenId => Donation) public donations;

    constructor()
        // address initialOwner
        ERC721("Blood", "BLOOD")
        Ownable(msg.sender)
    {}

    function mint(address to) external onlyOwner returns (uint256 tokenId) {
        tokenId = ++nextTokenId;
        super._safeMint(to, tokenId);
    }

    function updateDonation(uint256 _tokenId, uint256 _plasmaId, uint256 _erythrocytesId, uint256 _plateletsId) external onlyOwner {
        donations[_tokenId] = Donation(_plasmaId, _erythrocytesId, _plateletsId);
        super._burn(_tokenId);
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
