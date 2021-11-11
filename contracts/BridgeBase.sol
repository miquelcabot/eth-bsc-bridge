pragma solidity >=0.6.0 <0.8.0;

import "./IToken.sol";

contract BridgeBase {
    address public admin;
    IToken public token;
    uint256 public nonce;
    mapping(uint256 => bool) public processedNonces;

    enum Step {
        Burn,
        Mint
    }

    event Transfer(
        address from,
        address to,
        uint256 amount,
        uint256 date,
        uint256 nonce,
        Step indexed step
    );

    constructor(address _token) {
        admin = msg.sender;
        token = IToken(_token);
    }

    function burn(address account, uint256 amount) external {
        token.burn(msg.sender, amount);
        emit Transfer(
            msg.sender,
            account,
            amount,
            block.timestamp,
            nonce,
            Step.Burn
        );
        nonce++;
    }

    function mint(
        address account,
        uint256 amount,
        uint256 otherChainNonce
    ) external onlyAdmin {
        require(
            processedNonces[otherChainNonce] == false,
            "TRANSFER_ALREADY_PROCESSED"
        );
        processedNonces[otherChainNonce] = true;
        token.mint(account, amount);
        emit Transfer(
            msg.sender,
            account,
            amount,
            block.timestamp,
            otherChainNonce,
            Step.Mint
        );
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "ONLY_ADMIN");
        _;
    }
}
