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
  const bridgeETH = BridgeETH.attach(BRIDGEETH.address);

  bridgeETH.on('Transfer', (from, to, amount, date, nonce, step) => {  // When we detect the Transfer event
    console.log('Transfer');
    console.log(`from: ${from}`);
    console.log(`to: ${to}`);
    console.log(`amount: ${amount}`);
    console.log(`date: ${date}`);
    console.log(`nonce: ${nonce}`);
    console.log(`step: ${step}`);
  });

  const tx = await bridgeETH.burn(owner.address, amount);
  const receipt = await tx.wait();
  console.log('transactionHash: ', receipt.transactionHash);
  console.log('logs: ', JSON.stringify(receipt.logs));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
