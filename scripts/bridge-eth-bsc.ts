/* eslint-disable no-console */
import { BigNumber } from '@ethersproject/bignumber';
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
// Addresses in Rinkeby
import * as BRIDGEETH from '../deployments/rinkeby/BridgeETH.json';

/**
 * Bridge function
 */
async function bridge(from: string, to: string, amount: BigNumber, date: BigNumber, nonce: BigNumber, step: number) {
  console.log('Transfer');
  console.log(`from: ${from}`);
  console.log(`to: ${to}`);
  console.log(`amount: ${amount}`);
  console.log(`date: ${date}`);
  console.log(`nonce: ${nonce}`);
  console.log(`step: ${step}`);
  console.log(``);
}

/**
 * main function
 */
async function main() {
  const BridgeETH = await ethers.getContractFactory('BridgeETH');
  const bridgeETH = BridgeETH.attach(BRIDGEETH.address);

  // List past Transfer events
  const events = await bridgeETH.queryFilter(bridgeETH.filters.Transfer(), 0);
  for (let i = 0; i < events.length; i++) {
    await bridge(
      events[i].args?.from,
      events[i].args?.to,
      events[i].args?.amount,
      events[i].args?.date,
      events[i].args?.nonce,
      events[i].args?.step
    );
  }

  // Wait for new Transfer event
  bridgeETH.on('Transfer', async (from, to, amount, date, nonce, step) => {
    await bridge(from, to, amount, date, nonce, step);
  });
}

main();
