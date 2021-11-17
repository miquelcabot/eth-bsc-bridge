/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
// Addresses in Rinkeby
import * as BRIDGEETH from '../deployments/rinkeby/BridgeETH.json';

/**
 * main function
 */
async function main() {
  const BridgeETH = await ethers.getContractFactory('BridgeETH');
  const bridgeETH = await BridgeETH.attach(BRIDGEETH.address);

  const [owner] = await ethers.getSigners();
  const amount = 1000;
  // We get the last saved nonce for the account and add 1
  const nonce = (await bridgeETH.maxProcessedNonce(owner.address)).add(1);

  const message = ethers.utils.solidityKeccak256(
    ['address', 'address', 'uint256', 'uint256'],
    [owner.address, owner.address, amount, nonce]
  );
  // We need to pass the binary 32 bytes of data with ethers.utils.arrayify()
  // Source: https://github.com/ethers-io/ethers.js/issues/285
  const signature = await owner.signMessage(ethers.utils.arrayify(message));

  await bridgeETH.burn(owner.address, amount, nonce, signature);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
