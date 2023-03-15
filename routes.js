import express from "express";
import { createNFTVoucher, mintNFT } from "./controller.js";
export const _route = express.Router();

_route.route("/createVoucher").post(createNFTVoucher);
_route.route("/mintNFT").post(mintNFT);
