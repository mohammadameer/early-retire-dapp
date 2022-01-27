//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Investment.sol";

struct User {
    uint256 totalInvestments;
    Investment[] investments;
    uint256 lastDeposit;
}
