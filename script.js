import ethers from "ethers";
import { ABI } from "./ABI.js";

const infuraUrl =
  "https://goerli.infura.io/v3/73278735c19b4cd7bc5ea172332ca2f9";
export const initMint = async (voucher, privateKey) => {
  const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
  const signer = new ethers.Wallet(privateKey, provider);
  const tokenContractInstance = new ethers.Contract(
    "0xaD4B7E40805a4f20fadA11dBEfaC66cB82486d0e",
    ABI,
    provider
  );
  const txn = await tokenContractInstance
    .connect(signer)
    .safeMint(voucher, { value: ethers.utils.parseEther("0.001") });
  console.log(`Transaction hash: ${txn.hash}`);
  return txn;
};
