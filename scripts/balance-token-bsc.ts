/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
// Addresses in BSCtest
import * as TOKENBSC from '../deployments/bsctest/TokenBSC.json';

/**
 * main function
 */
async function main() {
  const [owner] = await ethers.getSigners();

  const TokenBSC = await ethers.getContractFactory('TokenBSC');
  const tokenBSC = await TokenBSC.attach(TOKENBSC.address);

  const balance = await tokenBSC.balanceOf(owner.address);
  console.log(`Balance of ${owner.address} in BSCTest: ${balance}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
