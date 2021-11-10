pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenBase is ERC20 {
    address public admin;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        admin = _msgSender();
    }

    function updateAdmin(address account) external onlyAdmin {
        admin = account;
    }

    function mint(address account, uint256 amount) external onlyAdmin {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyAdmin {
        _burn(account, amount);
    }

    modifier onlyAdmin() {
        require(_msgSender() == admin, "ONLY_ADMIN");
        _;
    }
}
