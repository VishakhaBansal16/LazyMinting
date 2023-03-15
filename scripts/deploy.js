require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
async function main() {
  const MyContract = await ethers.getContractFactory("LazyNFT");

  const myContract = await MyContract.deploy(process.env.NFT_CREATOR_ADDRESS);
  await myContract.deployed();
  console.log("Contract deployed to the address: ", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
