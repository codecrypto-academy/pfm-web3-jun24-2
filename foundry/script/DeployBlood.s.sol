// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {BloodTracker} from "../src/BloodTracker.sol";
import {Blood} from "../src/Blood.sol";

contract DeployBlood is Script {
    function run() external returns (BloodTracker, Blood) {
        vm.startBroadcast();
        Blood bld = new Blood();
        BloodTracker bldTracker = new BloodTracker(address(bld));
        bld.transferOwnership(address(bldTracker));
        vm.stopBroadcast();
        return (bldTracker, bld);
    }
}
