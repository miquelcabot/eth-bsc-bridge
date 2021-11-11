/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
// Addresses in Rinkeby
import * as BRIDGEETH from '../deployments/rinkeby/BridgeETH.json';

/**
 * main function
 */
async function main() {
  const [owner] = await ethers.getSigners();
  const amount = 1000;

  const BridgeETH = await ethers.getContractFactory('BridgeETH');
  const bridgeETH = await BridgeETH.attach(BRIDGEETH.address);

  await bridgeETH.burn(owner.address, amount);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
