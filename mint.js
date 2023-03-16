import dotenv from "dotenv/config";
import { ethers } from "ethers";
const SIGNING_DOMAIN_NAME = "Voucher-Domain";
const SIGNING_DOMAIN_VERSION = "1";
const chainId = 5;
const contractAddress = "0xaD4B7E40805a4f20fadA11dBEfaC66cB82486d0e";
const signer = new ethers.Wallet(process.env.NFT_CREATOR_PRIVATE_KEY);
const domain = {
  name: SIGNING_DOMAIN_NAME,
  version: SIGNING_DOMAIN_VERSION,
  verifyingContract: contractAddress,
  chainId,
};

async function createVoucher(tokenId, price, uri, buyer) {
  const voucher = { tokenId, price, uri, buyer };
  const types = {
    LazyNFTVoucher: [
      { name: "tokenId", type: "uint256" },
      { name: "price", type: "uint256" },
      { name: "uri", type: "string" },
      { name: "buyer", type: "address" },
    ],
  };

  const signature = await signer._signTypedData(domain, types, voucher);
  return {
    ...voucher,
    signature,
  };
}

export const init = async (tokenId, minPrice, uri, buyer) => {
  const voucher = await createVoucher(tokenId, minPrice, uri, buyer); // the address is the address which receives the NFT
  console.log(
    `[${voucher.tokenId}, ${voucher.price}, "${voucher.uri}", "${voucher.buyer}", "${voucher.signature}"]`
  );
  return voucher;
};
