# eth-bsc-bridge

Token bridge between Ethereum and Binance Smart Chain

## Configuration of .env file
To see the mnemonic or seed phrase in Metamask, [follow this instruction](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase).

The Metamask account (mnemonic in the `.env`) needs to have enough funds in the network where you want to interact with the smart contracts. For example, to add funds to the Rinkeby test network, visit [Rinkeby Faucet](https://faucet.rinkeby.io/).

```bash
cp .env.example .env
vi .env # add an account's mnemonic and an Infura API key
```

## Compile smart contracts
Compile the smart contracts and generate Typechain files:
```
yarn compile
```

## Deploy smart contracts
Deploy to Rinkeby:
```
yarn deploy:rinkeby
```

Deploy to BSC test network:
```
yarn deploy:bsctest
```

## Check for the balance in ETH and BSC
Check balance in Rinkeby:
```
yarn balance-token-eth
```

Check balance in BSC test network:
```
yarn balance-token-bsc
```

## Run the bridge
Run the bridge in Rinkeby:
```
yarn bridge-eth-bsc
```

## Transfer tokens from ETH to BSC
Transfer tokens from Rinkeby to BSC test network:
```
yarn transfer-eth-bsc
```