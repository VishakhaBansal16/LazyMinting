const SIGNING_DOMAIN_NAME = "Voucher-Domain";
const SIGNING_DOMAIN_VERSION = "1";
class LazyMinter {
  constructor({ contract, signer }) {
    this.contract = contract;
    this.signer = signer;
  }

  async createVoucher(tokenId, price, uri, buyer) {
    const voucher = { tokenId, price, uri, buyer };
    const domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract.address,
      chainId: 31337,
    };
    const types = {
      LazyNFTVoucher: [
        { name: "tokenId", type: "uint256" },
        { name: "price", type: "uint256" },
        { name: "uri", type: "string" },
        { name: "buyer", type: "address" },
      ],
    };

    const signature = await this.signer._signTypedData(domain, types, voucher);
    return {
      ...voucher,
      signature,
    };
  }

  async init(tokenId, price, uri, buyer) {
    const voucher = await this.createVoucher(tokenId, price, uri, buyer);
    const _tokenId = voucher.tokenId;
    const _price = voucher.price;
    const _uri = voucher.uri;
    const _buyer = voucher.buyer;
    const _signature = voucher.signature;

    const voucher1 = [_tokenId, _price, _uri, _buyer, _signature];
    return voucher1;
  }
}
module.exports = {
  LazyMinter,
};
