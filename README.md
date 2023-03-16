## Table of Contents

- [Task Description](#task-description)
- [Tasks Included](#tasks-included)
- [Technologies Included](#technologies-included)
- [Install and run](#install-and-run)
- [Hardhat Setup](#hardhat-setup)
- [Testing](#testing)
- [A Typical Top Level Directory](#a-typical-top-level-directory)

## Task Description

Implement Lazy Minting using ERC721.

## Tasks Included

- Create a Lazy Minting NFT smart contract using ERC721, ERC721URIStorage, EIP712.
- Create REST APIs for creating voucher and for minting NFT.
- Store the details of created voucher in the database.
- Check whether NFT buyer is authorised to mint NFT by fetching created voucher from database.
- If buyer is authorised then NFT must be minted.

## Technologies Included

- Nodejs for backend
- Solidity for smart contracts
- Hardhat for deploying contract on testnet goerli
- MongoDB for storing data.
- Postman for hitting APIs

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

Run npx hardhat verify --network goerli <deployed contract address> to verify the deployed contracts on netwrok goerli.

```
npx hardhat verify --network goerli <deployed contract address>

```

Run npx hardhat test for unit testing smart contract

```
npx hardhat test
```

Smart contract deployed on goerli testnet: 0x5cE8Bed7f508E3D36D312bf51221c6E185994C23

## Testing

Run npx hardhat test for unit testing smart contract

```
npx hardhat test
```

Expecting Test result.

```



```

## A Typical Top Level Directory
