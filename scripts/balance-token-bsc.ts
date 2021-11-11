/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { TokenBSC } from '../typechain/TokenBSC';
// eslint-disable-next-line camelcase
import { TokenBSC__factory } from '../typechain/factories/TokenBSC__factory';
// Addresses in BSCtest
import * as TOKENBSC from '../deployments/bsctest/TokenBSC.json';

/**
 * main function
 */
async function main() {
  const [owner] = await ethers.getSigners();

  const tokenBSC: TokenBSC = TokenBSC__factory.connect(TOKENBSC.address, owner);

  const balance = await tokenBSC.balanceOf(owner.address);
  console.log(`Balance of ${owner.address} in BSCTest: ${balance}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
