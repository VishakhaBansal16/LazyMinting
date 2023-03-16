import mongoose from "mongoose";
const NFTVoucherSchema = new mongoose.Schema(
  {
    tokenId: { type: String, unique: true },
    minPrice: { type: String },
    uri: { type: String },
    buyer: { type: String },
    signature: { type: String },
  },
  {
    timestamps: true,
  }
);

export const NFTVoucher = mongoose.model("NFTVoucher", NFTVoucherSchema);
