const { expect } = require("chai");
const hardhat = require("hardhat");
const { ethers } = hardhat;
const { LazyMinter } = require("../LazyMinting.js");

async function deploy() {
  const [minter, redeemer, random] = await ethers.getSigners();
  let factory = await ethers.getContractFactory("LazyNFT");
  const contract = await factory.deploy(minter.address);

  return {
    minter,
    redeemer,
    random,
    contract,
  };
}

describe("LazyNFT", function () {
  it("Should deploy", async function () {
    const signers = await ethers.getSigners();
    const minter = signers[0].address;

    const LazyNFT = await ethers.getContractFactory("LazyNFT");
    const lazynft = await LazyNFT.deploy(minter);
    await lazynft.deployed();
  });

  it("Should return minter address from recover function", async function () {
    const { contract, redeemer, minter } = await deploy();
    const lazyMinter = new LazyMinter({ contract, signer: minter });
    const voucher = await lazyMinter.init(0, 0, "abcd/", redeemer.address);
    expect(await contract.connect(redeemer).recover(voucher)).to.equal(
      minter.address
    );
  });

  it("Should redeem/mint NFT from an authorised voucher", async function () {
    const { contract, redeemer, minter } = await deploy();
    const lazyMinter = new LazyMinter({ contract, signer: minter });
    const voucher = await lazyMinter.init(0, 0, "abcd/", redeemer.address);
    await contract.connect(redeemer).safeMint(voucher);
  });

  it("Should mint NFT only if msg.value >= voucher.price", async function () {
    const { contract, redeemer, minter } = await deploy();
    const lazyMinter = new LazyMinter({ contract, signer: minter });
    const voucher = await lazyMinter.init(
      0,
      100000000000000,
      "abcd/",
      redeemer.address
    );
    await contract.connect(redeemer).safeMint(voucher, {
      value: ethers.utils.parseEther("0.001"),
    });
  });

  it("Should mint NFT only if msg.value < voucher.price", async function () {
    const { contract, redeemer, minter } = await deploy();
    const lazyMinter = new LazyMinter({ contract, signer: minter });
    const voucher = await lazyMinter.init(
      0,
      100000000000000,
      "abcd/",
      redeemer.address
    );
    await expect(
      contract.connect(redeemer).safeMint(voucher, {
        value: ethers.utils.parseEther("0.00001"),
      })
    ).to.be.revertedWith("Not enough ether sent.");
  });

  it("Should fail to redeem NFT voucher that's signed by an unauthorized account", async function () {
    const { contract, redeemer, random } = await deploy();
    const lazyMinter = new LazyMinter({ contract, signer: random });
    const voucher = await lazyMinter.init(0, 0, "abcd/", redeemer.address);
    await expect(
      contract.connect(redeemer).safeMint(voucher)
    ).to.be.revertedWith("Wrong signature.");
  });

  it("Should fail to redeem an NFT that is already claimed", async function () {
    const { contract, redeemer, minter, random } = await deploy();
    const lazyMinter = new LazyMinter({ contract, signer: minter });
    const voucher = await lazyMinter.init(
      0,
      100000000000000,
      "abcd/",
      redeemer.address
    );

    await contract.connect(redeemer).safeMint(voucher, {
      value: ethers.utils.parseEther("0.001"),
    });
    await expect(
      contract.connect(redeemer).safeMint(voucher, {
        value: ethers.utils.parseEther("0.001"),
      })
    ).to.be.revertedWith("ERC721: token already minted");
  });
});
