/* eslint-disable no-console */
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
import { BigNumber } from '@ethersproject/bignumber';
import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
// Addresses in Rinkeby
import * as BRIDGEETH from '../deployments/rinkeby/BridgeETH.json';
import * as BRIDGEBSC from '../deployments/bsctest/BridgeBSC.json';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

dotenvConfig({ path: resolve(__dirname, './.env') });

const MNEMONIC: string = process.env.MNEMONIC || '';

/**
 * bridge function
 */
async function bridge(from: string, to: string, amount: BigNumber, date: BigNumber, nonce: BigNumber, step: number, process: boolean) {
  console.log('Transfer');
  console.log(`from: ${from}`);
  console.log(`to: ${to}`);
  console.log(`amount: ${amount}`);
  console.log(`date: ${date}`);
  console.log(`nonce: ${nonce}`);
  console.log(`step: ${step}`);
  console.log(``);

  // Process only new events
  if (process) {
    // We create a signer (provider + wallet) to BSC
    const bscProvider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s2.binance.org:8545/');
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC);
    const signer = wallet.connect(bscProvider);

    const BridgeBSC = await ethers.getContractFactory('BridgeBSC', signer);
    const bridgeBSC = BridgeBSC.attach(BRIDGEBSC.address);

    // We mint() in BSC
    const tx = await bridgeBSC.mint(to, amount, nonce);
    const receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`
      Processed transfer:
      - from ${from} 
      - to ${to} 
      - amount ${amount} tokens
      - date ${date}
    `);
  }
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
      events[i].args?.step,
      false
    );
  }

  // Wait for new Transfer event
  bridgeETH.on('Transfer', async (from, to, amount, date, nonce, step) => {
    await bridge(from, to, amount, date, nonce, step, true);
  });
}

main();
