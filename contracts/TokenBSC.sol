pragma solidity >=0.6.0 <0.8.0;

import "./TokenBase.sol";

contract TokenBSC is TokenBase {
    constructor() TokenBase("BSC Token", "BTK") {}
}
