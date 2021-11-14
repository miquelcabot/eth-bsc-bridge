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
  const bridgeETH = BridgeETH.attach(BRIDGEETH.address);

  // List past Transfer events
  const events = await bridgeETH.queryFilter(bridgeETH.filters.Transfer(), 0);
  for (let i = 0; i < events.length; i++) {
    console.log('Transfer');
    if (events[i].args!) {
      console.log(`from: ${events[i].args?.from}`);
      console.log(`to: ${events[i].args?.to}`);
      console.log(`amount: ${events[i].args?.amount}`);
      console.log(`date: ${events[i].args?.date}`);
      console.log(`nonce: ${events[i].args?.nonce}`);
      console.log(`step: ${events[i].args?.step}`);
    }
    console.log(``);
  }

  // Wait for new Transfer event
  bridgeETH.on('Transfer', (from, to, amount, date, nonce, step) => {
    console.log('Transfer');
    console.log(`from: ${from}`);
    console.log(`to: ${to}`);
    console.log(`amount: ${amount}`);
    console.log(`date: ${date}`);
    console.log(`nonce: ${nonce}`);
    console.log(`step: ${step}`);
    console.log(``);
  });
}

main();
