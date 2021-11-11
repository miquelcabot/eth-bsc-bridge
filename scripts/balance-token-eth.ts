/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
// Addresses in Rinkeby
import * as TOKENETH from '../deployments/rinkeby/TokenETH.json';

/**
 * main function
 */
async function main() {
  const [owner] = await ethers.getSigners();

  const TokenETH = await ethers.getContractFactory('TokenETH');
  const tokenETH = await TokenETH.attach(TOKENETH.address);

  const balance = await tokenETH.balanceOf(owner.address);
  console.log(`Balance of ${owner.address} in Rinkeby: ${balance}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
