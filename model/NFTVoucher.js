import mongoose from "mongoose";
const NFTVoucherSchema = new mongoose.Schema(
  {
    tokenId: { type: String, unique: true },
    uri: { type: String },
    minPrice: { type: String },
    buyer: { type: String },
    signature: { type: String },
  },
  {
    timestamps: true,
  }
);

export const NFTVoucher = mongoose.model("NFTVoucher", NFTVoucherSchema);
