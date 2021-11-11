/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { TokenETH } from '../typechain/TokenETH';
// eslint-disable-next-line camelcase
import { TokenETH__factory } from '../typechain/factories/TokenETH__factory';
// Addresses in Rinkeby
import * as TOKENETH from '../deployments/rinkeby/TokenETH.json';

/**
 * main function
 */
async function main() {
  const [owner] = await ethers.getSigners();

  const tokenETH: TokenETH = TokenETH__factory.connect(TOKENETH.address, owner);

  const balance = await tokenETH.balanceOf(owner.address);
  console.log(`Balance of ${owner.address} in Rinkeby: ${balance}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
