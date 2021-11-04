# eth-bsc-bridge

Token bridge between Ethereum and Binance Smart Chain

## Configuration of .env file

To see the mnemonic or seed phrase in Metamask, [follow this instruction](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase).

The Metamask account (mnemonic in the `.env`) needs to have enough funds in the network where you want to interact with the smart contracts. For example, to add funds to the Rinkeby test network, visit [Rinkeby Faucet](https://faucet.rinkeby.io/).

```bash
cp .env.example .env
vi .env # add an account's mnemonic and an Infura API key
```
