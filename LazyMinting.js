import dotenv from "dotenv/config";
import { ethers } from "ethers";

// These constants must match the ones used in the smart contract.
const SIGNING_DOMAIN_NAME = "Voucher-Domain";
const SIGNING_DOMAIN_VERSION = "1";

const contractAddress = "0x5cE8Bed7f508E3D36D312bf51221c6E185994C23"; //deployed contract address
const signer = new ethers.Wallet(process.env.NFT_CREATOR_PRIVATE_KEY);

async function createVoucher(tokenId, uri, minPrice, buyer) {
  const voucher = { tokenId, uri, minPrice, buyer };
  const domain = await _signingDomain();
  const types = {
    LazyNFTVoucher: [
      { name: "tokenId", type: "uint256" },
      { name: "uri", type: "string" },
      { name: "minPrice", type: "uint256" },
      { name: "buyer", type: "address" },
    ],
  };
  const signature = await signer._signTypedData(domain, types, voucher);
  return {
    ...voucher,
    signature,
  };
}

async function _signingDomain() {
  let _domain;
  if (_domain != null) {
    return _domain;
  }
  const chainId = 5;
  _domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: contractAddress,
    chainId,
  };
  return _domain;
}

export const init = async (tokenId, uri, minPrice, buyer) => {
  const voucher = await createVoucher(tokenId, uri, minPrice, buyer);
  console.log(
    `[${voucher.tokenId}, "${voucher.uri}", ${voucher.minPrice}, "${voucher.buyer}", "${voucher.signature}"]`
  );
  return voucher;
};
export { createVoucher };
