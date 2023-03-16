import { init } from "./mint.js";
import { NFTVoucher } from "./model/NFTVoucher.js";
import { ethers } from "ethers";
import { initMint } from "./script.js";
import { Decimal128 } from "mongodb";

export const createNFTVoucher = async (req, res, next) => {
  try {
    //Get user input
    const { tokenId, minPrice, uri, buyer } = req.body;
    if (!(tokenId, minPrice, uri, buyer)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }
    const minPriceInWei = ethers.utils.parseEther(minPrice);
    const Receipt = await init(tokenId, minPriceInWei, uri, buyer);

    if (!Receipt) {
      throw createError(404, "Not Found");
    }
    const price = new Decimal128(minPriceInWei.toString());

    const nftVoucher = await NFTVoucher.create({
      tokenId,
      minPrice: price,
      uri,
      buyer,
      signature: Receipt.signature,
    });

    res.status(201).json({
      status: "success",
      nftVoucher,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const mintNFT = async (req, res, next) => {
  try {
    //Get user input
    const { tokenId, minPrice, uri, buyer, buyerPrivateKey } = req.body;

    if (!(tokenId, minPrice, uri, buyer, buyerPrivateKey)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }
    const minPriceInWei = ethers.utils.parseEther(minPrice);
    const price = minPriceInWei.toString();
    const signedVoucher = await NFTVoucher.findOne({ tokenId });

    if (
      !(
        tokenId == signedVoucher.tokenId &&
        price == signedVoucher.minPrice &&
        uri == signedVoucher.uri &&
        buyer == signedVoucher.buyer
      )
    ) {
      res.status(400).json({
        status: "failed",
        message: "Unauthorised voucher",
      });
    }
    const _tokenId = signedVoucher.tokenId;
    const _price = signedVoucher.minPrice;
    const _uri = signedVoucher.uri;
    const _buyer = signedVoucher.buyer;
    const _signature = signedVoucher.signature;

    const voucher = [_tokenId, _price, _uri, _buyer, _signature];
    console.log(voucher);
    const txn = await initMint(voucher, buyer, buyerPrivateKey);

    console.log(`Txn is :${txn}`);
    res.status(201).json({
      status: "success",
      txn,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
