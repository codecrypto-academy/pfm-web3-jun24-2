// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {BloodTracker} from "../src/BloodTracker.sol";
import {BloodDonation} from "../src/BloodDonation.sol";
import {BloodDerivative} from "../src/BloodDerivative.sol";
import {DeployBlood} from "./DeployBlood.s.sol";

contract Actions is Script {
    BloodTracker bldTracker;
    BloodDonation bld;
    BloodDerivative bldDerivative;

    function run() external {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        DeployBlood deploy = new DeployBlood();
        vm.startBroadcast();
        (bldTracker, bld, bldDerivative) = deploy.run();

        vm.stopBroadcast();
    }
}
