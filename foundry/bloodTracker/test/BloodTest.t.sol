// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
import {DeployBlood} from "../script/DeployBlood.s.sol";
import {Blood} from "../src/Blood.sol";
import {BloodTracker} from "../src/BloodTracker.sol";

contract BloodTest is Test {
    Blood bld;
    BloodTracker bldTracker;

    function setUp() external {
        DeployBlood deploy = new DeployBlood();
        (bldTracker, bld) = deploy.run();
    }

    function testOwnership() external view {
        assert(bld.owner() == address(bldTracker));
    }
}
