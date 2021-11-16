/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
// Addresses in Rinkeby
import * as BRIDGEETH from '../deployments/rinkeby/BridgeETH.json';

/**
 * main function
 */
async function main() {
  const nonce = 1; //Need to increment this for each new transfer
  const [owner] = await ethers.getSigners();
  const amount = 1000;

  const message = ethers.utils.solidityKeccak256(
    ['address', 'address', 'uint256', 'uint256'],
    [owner.address, owner.address, amount, nonce]
  );
  // We need to pass the binary 32 bytes of data with ethers.utils.arrayify()
  // Source: https://github.com/ethers-io/ethers.js/issues/285
  const signature = await owner.signMessage(ethers.utils.arrayify(message));

  const BridgeETH = await ethers.getContractFactory('BridgeETH');
  const bridgeETH = await BridgeETH.attach(BRIDGEETH.address);

  await bridgeETH.burn(owner.address, amount, nonce, signature);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
