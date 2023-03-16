const { expect } = require("chai");
const hardhat = require("hardhat");
const { ethers } = hardhat;
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { lazy } = require("./LazyMinting.js");
async function deployTokenFixture() {
  const [minter, redeemer] = await ethers.getSigners();

  const MyContract = await ethers.getContractFactory("LazyNFT");

  const hardhatToken = await MyContract.deploy(minter);

  await hardhatToken.deployed();

  return { hardhatToken, minter, redeemer };
}

it("Should redeem an NFT from a signed voucher", async function () {
  const { hardhatToken, redeemer, minter } = await loadFixture(
    deployTokenFixture
  );

  const voucher = await lazy.init(0, "abcd/", 5, redeemer);
  console.log(voucher);
  expect(await hardhatToken.recover(voucher)).to.equal(minter);
});
