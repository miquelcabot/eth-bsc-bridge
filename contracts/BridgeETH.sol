// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./BridgeBase.sol";

contract BridgeETH is BridgeBase {
    constructor(address token) BridgeBase(token) {}
}
