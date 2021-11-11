pragma solidity >=0.6.0 <0.8.0;

import "./TokenBase.sol";

contract TokenETH is TokenBase {
    constructor() TokenBase("ETH Token", "ETK") {}
}
