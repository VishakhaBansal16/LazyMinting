## Table of Contents

- [Task Description](#task-description)
- [Tasks Included](#tasks-included)
- [Technologies Included](#technologies-included)
- [Install and run](#install-and-run)
- [Hardhat Setup](#hardhat-setup)
- [Testing](#testing)
- [A Typical Top Level Directory](#a-typical-top-level-directory)

## Task Description

List your ERC721A NFT collection on Opensea with Pinata.

## Tasks Included

- Create a NFT smart contract using ERC721A
- Create REST API for minting new NFTs
- Prepare JSON URIs for each token
- Set token URI for every token at the time of minting
- Use Pinata IPFS cloud for uploading these URIs
- NFTs must be visible on opensea marketplace

## Technologies Included

- Nodejs for backend
- Solidity for smart contracts
- Hardhat for deploying contract on testnet goerli
- Pinata IPFS cloud to upload and manage files.
- OpenSea marketplace to list NFTs
- Postman for hitting minting API

## Install and Run

To run this project, you must have the following installed:

- nodejs
- npm

Run npm install to install required dependencies.

```
$ npm install
```

Run npm run dev to start the server and hitting API.

```
$ npm run dev
```

## Hardhat Setup

Run npm install hardhat to install hardhat.

```
npm install hardhat
```

Run npm install '@nomiclabs/hardhat-etherscan' to install hardhat plugin for verifying contracts on etherscan.

```
npm install '@nomiclabs/hardhat-etherscan'
```

Run npm i @nomiclabs/hardhat-ethers to install plugin which brings Hardhat the Ethereum library ethers.js, which allows to interact with the Ethereum blockchain

```
Run npm i @nomiclabs/hardhat-ethers
```

Run npx hardhat to run the hardhat in application.

```
npx hardhat
```

This project demonstrates an hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

Try running some of the following tasks:

Run npx hardhat compile to compile all contracts.

```
npx hardhat compile
```

Run npx hardhat run scripts/deploy.js --network goerli to deploy contracts on network goerli.

```
npx hardhat run scripts/deploy.js --network goerli
```

Run npx hardhat run scripts/verify.js --network goerli to verify the deployed contracts on netwrok goerli.

```
npx hardhat run scripts/verify.js --network goerli
```

Run npx hardhat test for unit testing smart contract

```
npx hardhat test
```

Smart contract deployed on goerli testnet: 0xFD00c86e8421873006149DAFcE1cbA7E87D09f80

## Testing

Run npx hardhat test for unit testing smart contract

```
npx hardhat test
```

Expecting Test result.

```
✔ Should set the right name and symbol (799ms)
    ✔ Should assign the total supply of NFTs to the minter (62ms)
    ✔ Should reduce the total supply of NFTs after burning (299ms)
    ✔ Should assign the total number of NFTs minted to the totalSupply (201ms)
    ✔ Should return owner of a minted NFT (116ms)
    ✔ Should remove the owner of a NFT after burning (158ms)
    ✔ Should not allow non-owners to set baseURI (114ms)
    ✔ Should return the baseURI (88ms)


  8 passing (2s)
```

## A Typical Top Level Directory
