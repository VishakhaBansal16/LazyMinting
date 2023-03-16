import { init } from "./mint.js";
import { NFTVoucher } from "./model/NFTVoucher.js";
import web3 from "web3";
import { initMint } from "./script.js";

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
    const minPriceInWei = web3.utils.toWei(minPrice.toString(), "ether");
    const Receipt = await init(tokenId, minPriceInWei, uri, buyer);

    if (!Receipt) {
      throw createError(404, "Not Found");
    }

    const nftVoucher = await NFTVoucher.create({
      tokenId,
      minPrice: minPriceInWei,
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
    const minPriceInWei = web3.utils.toWei(minPrice.toString(), "ether");

    const signedVoucher = await NFTVoucher.findOne({ tokenId });

    if (!signedVoucher) {
      throw createError(404, "Not Found");
    }

    if (
      !(
        tokenId == signedVoucher.tokenId &&
        minPriceInWei == signedVoucher.minPrice &&
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
