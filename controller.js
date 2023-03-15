import { init, createVoucher } from "./LazyMinting.js";
import { NFTVoucher } from "./model/NFTVoucher.js";
import { ethers } from "ethers";
import { initMint } from "./script.js";
import { Decimal128 } from "mongodb";
//const provider = new ethers.providers.JsonRpcProvider(
// "https://goerli.infura.io/v3/73278735c19b4cd7bc5ea172332ca2f9"
//);
//const contractAddress = "0x5cE8Bed7f508E3D36D312bf51221c6E185994C23";
//const contractInstance = new ethers.Contract(contractAddress, ABI, provider);

export const createNFTVoucher = async (req, res, next) => {
  try {
    //Get user input
    const { tokenId, uri, minPrice, buyer } = req.body;
    if (!(tokenId, uri, minPrice, buyer)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }
    const minPriceInWei = ethers.utils.parseEther(minPrice);
    const Receipt = await init(tokenId, uri, minPriceInWei, buyer);
    //console.log(`Receipt is: , ${Receipt.signature}`);

    if (!Receipt) {
      throw createError(404, "Not Found");
    }
    const price = new Decimal128(minPriceInWei.toString());
    const nftVoucher = await NFTVoucher.create({
      tokenId,
      uri,
      minPrice: price,
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
    const { tokenId, uri, minPrice, buyer, buyerPrivateKey } = req.body;

    if (!(tokenId, uri, minPrice, buyer, buyerPrivateKey)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }
    const minPriceInWei = ethers.utils.parseEther(minPrice);
    const price = minPriceInWei.toString();
    const signedVoucher = await NFTVoucher.findOne({ tokenId });
    //console.log(`Signed voucher : , ${signedVoucher}`);
    if (
      !(
        tokenId == signedVoucher.tokenId &&
        uri == signedVoucher.uri &&
        price == signedVoucher.minPrice &&
        buyer == signedVoucher.buyer
      )
    ) {
      res.status(400).json({
        status: "failed",
        message: "Unauthorised voucher",
      });
    }

    //const signer = new ethers.Wallet(buyerPrivateKey, provider);
    const signature = signedVoucher.signature;
    const voucher = { tokenId, price, uri, buyer, signature };
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
