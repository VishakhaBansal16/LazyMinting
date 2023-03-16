import Web3 from "web3";
import ethers from "ethers";
import { ABI } from "./ABI.js";

const infuraUrl =
  "https://goerli.infura.io/v3/73278735c19b4cd7bc5ea172332ca2f9";

//mint
export const initMint = async (voucher, address, privateKey) => {
  const web3 = new Web3(infuraUrl);
  const myContract = new web3.eth.Contract(
    ABI,
    "0xaD4B7E40805a4f20fadA11dBEfaC66cB82486d0e"
  );

  const tx = myContract.methods.safeMint(voucher);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const value = web3.utils.toWei("0.001", "ether");
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: myContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      value,
    },
    privateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(receipt);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  return receipt;
};
