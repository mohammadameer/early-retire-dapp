//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/Investment.sol";
import "./interfaces/User.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EarlyRetire is ReentrancyGuard {
    event Invest(address indexed user, uint256 amount, uint256 date);
    event Withdraw(address indexed user, uint256 amount, uint256 date);

    uint256 public numberOfInvestors;
    uint256 public allInvestments = 0;

    mapping(address => User) public users;

    function invest() public payable {
        if (users[msg.sender].investments.length == 0) {
            numberOfInvestors++;
        }

        User storage user = users[msg.sender];

        Investment memory investment = Investment({
            date: block.timestamp,
            amount: msg.value
        });

        user.totalInvestments += msg.value;

        user.investments.push(investment);

        allInvestments += msg.value;
        emit Invest(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public payable nonReentrant {
        User storage user = users[msg.sender];

        uint256 lastDeposit = user.lastDeposit == 0
            ? block.timestamp
            : user.lastDeposit;

        uint256 withdrawablelDays = (block.timestamp - lastDeposit) /
            60 /
            60 /
            24;

        if (user.totalInvestments == 0 || withdrawablelDays == 0) {
            revert("No withdrawable amount");
        }

        uint256 amount = user.totalInvestments / (20 / withdrawablelDays);

        user.totalInvestments -= amount;

        user.lastDeposit = block.timestamp;

        (bool sent, bytes memory data) = msg.sender.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit Withdraw(msg.sender, amount, block.timestamp);
    }

    function getUserInvestments() public view returns (Investment[] memory) {
        return users[msg.sender].investments;
    }

    function getWithdrawableAmount() public view returns (uint256) {
        User storage user = users[msg.sender];

        uint256 lastDeposit = user.lastDeposit == 0
            ? block.timestamp
            : user.lastDeposit;

        uint256 withdrawablelDays = (block.timestamp - lastDeposit) /
            60 /
            60 /
            24;

        if (user.totalInvestments == 0 || withdrawablelDays == 0) {
            return 0;
        }

        uint256 amount = user.totalInvestments / (20 / withdrawablelDays);

        return amount;
    }
}
