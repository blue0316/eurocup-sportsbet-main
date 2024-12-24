import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../lib/models/User";
import {
  ethers,
  Contract,
  keccak256,
  toUtf8Bytes,
  solidityPacked,
} from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.CASHIER_KEY!, provider);
const cashierAddress = process.env.CASHIER_CONTRACT_ADDRESS as string;
const tokenAddress = process.env.TOKEN_ADDRESS as string;

const cashierAbi = [
  "function nonce(address) public view returns(uint256)",
  "function withdraw(address recipient, uint256 amount, bytes memory signature) public",
  "function deposit(uint256 amount, bytes memory signature) public",
];

const cashierContract = new Contract(cashierAddress, cashierAbi, wallet);

const tokenAbi = [
  "function transfer(address to, uint256 amount) public returns (bool)",
];

const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, wallet);

async function transferTokens(amount: any, recipient: any) {
  const parsedAmount = ethers.parseUnits(amount.toString(), 18);
  const tx = await tokenContract.transfer(recipient, parsedAmount);
  return tx;
}

async function signMessage(
  user: string,
  amount: ethers.BigNumberish,
  token: string,
  message: string
): Promise<string> {
  const nonce = await cashierContract.nonce(user);

  const messageHash = keccak256(
    solidityPacked(
      ["address", "uint256", "address", "uint256", "string"],
      [user, amount, token, nonce, message]
    )
  );

  return await wallet.signMessage(toUtf8Bytes(messageHash));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { walletAddress, amount, chainId } = req.body;

        if (!chainId) {
          return res
            .status(400)
            .json({ success: false, message: "Chain ID is required" });
        }

        const isSepolia = chainId === 11155111;
        const isMainnet = chainId === 1;

        if (!isSepolia && !isMainnet) {
          return res
            .status(400)
            .json({ success: false, message: "Unsupported network" });
        }

        await dbConnect(chainId);

        if (!walletAddress || !amount) {
          return res.status(400).json({
            success: false,
            message: "Wallet address and amount are required",
          });
        }

        const user = await User.findOne({ walletAddress });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "Wallet not found" });
        }

        if (Number(amount) > user.tokenUnlocked) {
          return res
            .status(400)
            .json({ success: false, message: "Insufficient unlocked tokens" });
        }

        const message = "withdraw";
        const signature = await signMessage(
          walletAddress,
          Number(amount),
          tokenAddress,
          message
        );

        try {
          const tx = await transferTokens(Number(amount), walletAddress);
          await tx.wait();

          user.tokenUnlocked -= Number(amount);
          await user.save();

          res.status(200).json({
            success: true,
            data: { walletAddress, amount, signature, cashierAddress },
          });
        } catch (transferError) {
          return res.status(400).json({
            success: false,
            message: "Withdraw failed",
          });
        }
      } catch (error: any) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
