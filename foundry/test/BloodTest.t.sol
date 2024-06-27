// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {DeployBlood} from "../script/DeployBlood.s.sol";
import {BloodDonation} from "../src/BloodDonation.sol";
import {BloodDerivative} from "../src/BloodDerivative.sol";
import {BloodTracker} from "../src/BloodTracker.sol";

contract BloodTest is Test {
    BloodDonation bld;
    BloodDerivative der;
    BloodTracker bldTracker;

    function setUp() external {
        DeployBlood deploy = new DeployBlood();
        (bldTracker, bld, der) = deploy.run();
    }

    function testOwnership() external view {
        assert(bld.owner() == address(bldTracker));
    }
}
