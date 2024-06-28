// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {DeployBlood} from "../script/DeployBlood.s.sol";
import {BloodDonation} from "../src/BloodDonation.sol";
import {BloodDerivative} from "../src/BloodDerivative.sol";
import {BloodTracker} from "../src/BloodTracker.sol";

import {Marketplace} from "../src/Marketplace.sol";

contract BloodTest is Test {
    BloodDonation bld;
    BloodDerivative der;
    // Blood testBloodMarketPlace;
    BloodTracker bldTracker;
    address immutable USER = makeAddr("USER");
    address immutable DONATION_CENTER = makeAddr("DONATION_CENTER");
    address immutable LABORATORY = makeAddr("LABORATORY");
    address immutable TRADER = makeAddr("TRADER");

    function setUp() external {
        DeployBlood deploy = new DeployBlood();
        (bldTracker, bld, der) = deploy.run();
        vm.prank(DONATION_CENTER);
        bldTracker.signUp("donationCenter", "Madrid", BloodTracker.Role.DONATION_CENTER);
        vm.prank(LABORATORY);
        bldTracker.signUp("laboratory", "Madrid", BloodTracker.Role.LABORATORY);
        vm.prank(TRADER);
        bldTracker.signUp("trader", "Madrid", BloodTracker.Role.TRADER);
    }

    function testOwnership() external view {
        assert(bld.owner() == address(bldTracker));
    }

    function testDonateFunction() public returns (uint256 tokenId) {
        vm.prank(DONATION_CENTER);
        tokenId = bldTracker.donate(USER);
        assert(DONATION_CENTER == bld.ownerOf(tokenId));
    }

    function testCreateDerivative() public returns (uint256, uint256, uint256) {
        uint256 tokenId = testDonateFunction();
        vm.prank(DONATION_CENTER);
        bld.transferFrom(DONATION_CENTER, LABORATORY, tokenId);
        vm.startPrank(LABORATORY);
        bld.approve(address(bldTracker), tokenId);
        (uint256 tokenIdPlasma, uint256 tokenIdErythrocytes, uint256 tokenIdPlatelets) = bldTracker.process(tokenId);
        assert(der.ownerOf(tokenIdPlasma) == LABORATORY);
        assert(der.ownerOf(tokenIdErythrocytes) == LABORATORY);
        assert(der.ownerOf(tokenIdPlatelets) == LABORATORY);
        return (tokenIdPlasma, tokenIdErythrocytes, tokenIdPlatelets);
    }

    function testFailDonateFunction() public {
        bldTracker.donate(DONATION_CENTER);
    }

    function testListItemMarketplaceLabRole() public returns (uint256 tokenId) {
        uint256[] memory beforeTokenOnSale = bldTracker.getTokensOnSale(address(bld));
        tokenId = testDonateFunction();
        vm.startPrank(DONATION_CENTER);
        bld.approve(address(this), tokenId);
        bld.transferFrom(DONATION_CENTER, LABORATORY, tokenId);
        vm.stopPrank();
        vm.startPrank(LABORATORY);
        bld.approve(address(bldTracker), tokenId);
        bldTracker.listItem(address(bld), tokenId, 0.1 ether);
        vm.stopPrank();

        uint256[] memory afterTokensOnSale = bldTracker.getTokensOnSale(address(bld));

        assert(beforeTokenOnSale.length < afterTokensOnSale.length);
    }

    function testListItemMarketplaceTraderRole() public returns (uint256 tokenId) {
        uint256[] memory beforeTokenOnSale = bldTracker.getTokensOnSale(address(bld));
        tokenId = testDonateFunction();
        vm.startPrank(DONATION_CENTER);
        bld.approve(address(this), tokenId);
        bld.transferFrom(DONATION_CENTER, TRADER, tokenId);
        vm.stopPrank();
        vm.startPrank(TRADER);
        bld.approve(address(bldTracker), tokenId);
        bldTracker.listItem(address(bld), tokenId, 0.1 ether);
        vm.stopPrank();

        uint256[] memory afterTokensOnSale = bldTracker.getTokensOnSale(address(bld));

        assert(beforeTokenOnSale.length < afterTokensOnSale.length);
    }

    function testFailListItemMarketplace() public {
        uint256[] memory beforeTokenOnSale = bldTracker.getTokensOnSale(address(bld));
        uint256 tokenId = testDonateFunction();
        vm.startPrank(DONATION_CENTER);
        bld.approve(address(this), tokenId);
        bld.transferFrom(DONATION_CENTER, LABORATORY, tokenId);
        vm.stopPrank();
        vm.startPrank(USER);
        // bld.approve(address(bldTracker), tokenId);
        bldTracker.listItem(address(bld), tokenId, 0.1 ether);
        vm.stopPrank();

        uint256[] memory afterTokensOnSale = bldTracker.getTokensOnSale(address(bld));

        assert(beforeTokenOnSale.length < afterTokensOnSale.length);
    }

    // function testFailBuyItemMarketplaceWithoutTraderRole() external {
    //     hoax(BOB);
    //     bldTracker.buyItem{value: 0.1 ether}(address(testBloodMarketPlace), 0);
    // }

    function testBuyItemMarketplaceWithoutTraderRole() external {
        uint256 tokenId = testListItemMarketplaceLabRole();
        uint256 beforeBalance = bld.balanceOf(TRADER);
        Marketplace.Listing memory listedItem = bldTracker.getListing(address(bld), tokenId);
        address seller = listedItem.seller;
        uint256 beforeBuySellerBalance = address(seller).balance;
        hoax(TRADER);
        bldTracker.buyItem{value: 0.1 ether}(address(bld), tokenId);
        uint256 afterBuySellerBalance = address(seller).balance;
        uint256 afterBalance = bld.balanceOf(TRADER);
        assert(beforeBalance < afterBalance);
        assert(bld.balanceOf(address(bldTracker)) == 0);
        console.log("balance of laboratory", LABORATORY.balance);
        assert(beforeBuySellerBalance < afterBuySellerBalance);
    }

    function testCancelListingFunction() public {
        uint256 tokenId = testListItemMarketplaceTraderRole();
        assert(bld.ownerOf(tokenId) == address(bldTracker));
        vm.prank(TRADER);
        bldTracker.cancelListing(address(bld), tokenId);
        assert(bld.ownerOf(tokenId) == TRADER);
    }

    function testUpdateListingFunction() public {
        uint256 newPrice = 1000 ether;
        uint256 tokenId = testListItemMarketplaceTraderRole();
        vm.prank(TRADER);
        bldTracker.updateListing(address(bld), tokenId, newPrice);
        Marketplace.Listing memory listedItem = bldTracker.getListing(address(bld), tokenId);
        assert(listedItem.price == newPrice);
    }
}
