// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract StakeholderRegistry is Ownable {
    enum StakeholderType { ExtractionUnit, Laboratory, Hospital, Pharmaceutical }

    struct Stakeholder {
        address wallet;
        StakeholderType stakeholderType;
        string info;
        bool isRegistered;
    }

    mapping(address => Stakeholder) public stakeholders;

    function registerStakeholder(address wallet, StakeholderType stakeholderType, string memory info) public onlyOwner {
        require(!stakeholders[wallet].isRegistered, "Stakeholder already registered");
        stakeholders[wallet] = Stakeholder(wallet, stakeholderType, info, true);
    }

    function isStakeholderRegistered(address wallet) public view returns (bool) {
        return stakeholders[wallet].isRegistered;
    }

    function getStakeholder(address wallet) public view returns (Stakeholder memory) {
        return stakeholders[wallet];
    }
}
