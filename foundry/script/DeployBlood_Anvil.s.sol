// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {BloodTracker} from "../src/BloodTracker.sol";
import {BloodDonation} from "../src/BloodDonation.sol";
import {BloodDerivative} from "../src/BloodDerivative.sol";

contract DeployBlood is Script {
    function run()
        external
        returns (BloodTracker, BloodDonation, BloodDerivative)
    {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        BloodDonation bld = new BloodDonation();
        BloodDerivative der = new BloodDerivative();
        BloodTracker bldTracker = new BloodTracker(address(bld), address(der));
        bld.transferOwnership(address(bldTracker));
        der.transferOwnership(address(bldTracker));
        vm.stopBroadcast();
        return (bldTracker, bld, der);
    }
}
