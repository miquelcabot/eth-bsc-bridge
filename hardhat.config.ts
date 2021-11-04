import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
dotenvConfig({ path: resolve(__dirname, './.env') });

import { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';

const CHAIN_IDS = {
  hardhat: 1337,
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  bscmain: 56,
  bsctest: 97
};

const MNEMONIC: string = process.env.MNEMONIC || '';
const INFURA_API_KEY = process.env.INFURA_API_KEY || '';

const getInfuraURL = (network: string) => {
  return `https://${network}.infura.io/v3/${INFURA_API_KEY}`;
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      // MEMO: inspired by https://hardhat.org/metamask-issue.html
      chainId: CHAIN_IDS.hardhat,
      accounts: { mnemonic: MNEMONIC }
    },
    mainnet: {
      url: getInfuraURL('mainnet'),
      chainId: CHAIN_IDS.mainnet,
      timeout: 8000000,
      gasPrice: 100000000000,
      accounts: { mnemonic: MNEMONIC }
    },
    ropsten: {
      url: getInfuraURL('ropsten'),
      chainId: CHAIN_IDS.ropsten,
      accounts: { mnemonic: MNEMONIC }
    },
    rinkeby: {
      url: getInfuraURL('rinkeby'),
      chainId: CHAIN_IDS.rinkeby,
      accounts: { mnemonic: MNEMONIC }
    },
    testnet: {
      url: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
      chainId: CHAIN_IDS.bsctest,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC }
    },
    bscmain: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: CHAIN_IDS.bscmain,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC }
    },
    bsctest: {
      url: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
      chainId: CHAIN_IDS.bsctest,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC }
    }
  },
  solidity: {
    compilers: [
      { version: '0.7.6', settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: '0.6.2', settings: { optimizer: { enabled: true, runs: 200 } } },
      { version: '0.6.0', settings: { optimizer: { enabled: true, runs: 200 } } }
    ]
  },
  mocha: {
    timeout: 8000000
  },
  gasReporter: {
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || '',
    enabled: process.env.GAS_REPORT ? true : false
  },
  namedAccounts: {
    deployer: {
      default: 0 // Here this will by default take the first account as deployer
    }
  }
};

export default config;
