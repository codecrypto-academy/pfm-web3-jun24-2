// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {BloodTracker} from "../src/BloodTracker.sol";
import {BloodDonation} from "../src/BloodDonation.sol";
import {BloodDerivative} from "../src/BloodDerivative.sol";
import {DeployBlood} from "./DeployBlood.s.sol";
import {BloodTracker} from "../src/BloodTracker.sol";
import {DevOpsTools} from "../lib/foundry-devops/src/DevOpsTools.sol";

contract Actions is Script {
    BloodTracker bldTracker =
        BloodTracker(0x7687ccCaC201275422762D6ecBc57d6C092cdCB7);
    BloodDonation bld =
        BloodDonation(0xA4028220B44F8114B61A2c4FF1AD26D32B436a5B);
    BloodDerivative bldDerivative =
        BloodDerivative(0xF27893f2F8A2df0C33EA4AF37061a918f22785b0);

    // function run() external {
    //     // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    //     DeployBlood deploy = new DeployBlood();
    //     vm.startBroadcast();
    //     (bldTracker, bld, bldDerivative) = deploy.run();

    //     vm.stopBroadcast();
    // }

    function run() public {
        // bldTracker = BloodTracker(
        // DevOpsTools.get_most_recent_deployment(
        //     "BloodTracker",
        //     block.chainid
        // )
        // );
        address bldDonationContractAddress = DevOpsTools
            .get_most_recent_deployment(
                "BloodDonation",
                block.chainid,
                "/home/juangas/codecrypto/proyecto_final/project-web3-jun24-2/foundry/broadcast"
            );
        if (bldDonationContractAddress == address(0)) {
            DeployBlood deploy = new DeployBlood();
            vm.startBroadcast();
            (bldTracker, bld, bldDerivative) = deploy.run();
            vm.stopBroadcast();
        }
        bld = BloodDonation(bldDonationContractAddress);
        address bldDerivativeContractAddress = DevOpsTools
            .get_most_recent_deployment(
                "BloodDerivative",
                block.chainid,
                "/home/juangas/codecrypto/proyecto_final/project-web3-jun24-2/foundry/broadcast"
            );
        bldDerivative = BloodDerivative(bldDerivativeContractAddress);
        address bldTrackerContractAddress = bld.owner();
        bldTracker = BloodTracker(bldTrackerContractAddress);
        console.log(
            "La direccion de BloodTracker es: ",
            bldTrackerContractAddress
        );
        console.log(
            "La direccion de BloodDonation es: ",
            bldDonationContractAddress
        );
        console.log(
            "La direccion de BloodDerivative es: ",
            bldDerivativeContractAddress
        );
    }

    function signUp(
        string memory companyName,
        string memory location,
        BloodTracker.Role role
    ) public {
        vm.startBroadcast();
        bldTracker.signUp(companyName, location, role);
        vm.stopBroadcast();
        console.log("Donante ", msg.sender, "ha sido registrado");
    }

    function donate(address from) public {
        vm.startBroadcast();
        bldTracker.donate{value: bldTracker.getMinimumDonationFee()}(from);
        vm.stopBroadcast();
    }

    function process(uint256 tokenId) public {
        vm.startBroadcast();
        bldTracker.process(tokenId);
        vm.stopBroadcast();
    }
}
