import type { NextApiRequest, NextApiResponse } from "next";
import {
  ethers,
  Contract,
  keccak256,
  solidityPacked,
  toUtf8Bytes,
  parseUnits,
} from "ethers";
import dbConnect from "lib/dbConnect";
import User from "lib/models/User";
import verifyToken from "lib/verifyToken";

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.CASHIER_KEY!, provider);

const cashierAddress = process.env.CASHIER_CONTRACT_ADDRESS as string;
const tokenAddress = process.env.TOKEN_ADDRESS as string;

const tokenAbi = [
  "function balanceOf(address owner) public view returns (uint256)",
];

const tokenContract = new Contract(tokenAddress, tokenAbi, wallet);

const signMessage = async (
  user: string,
  amount: bigint,
  token: string,
  message: string
): Promise<string> => {
  const nonce = BigInt(Date.now());

  const messageHash = keccak256(
    solidityPacked(
      ["address", "uint256", "address", "uint256", "string"],
      [user, amount, token, nonce, message]
    )
  );

  return await wallet.signMessage(toUtf8Bytes(messageHash));
};

async function waitForTransaction(transactionHash: any) {
  let tx = await provider.getTransaction(transactionHash);
  while (tx === null || !tx.blockNumber) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    tx = await provider.getTransaction(transactionHash);
  }
  return tx;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { amount, walletAddress, chainId, transactionHash } = req.body;
        const { address, signature } = req as any;

        if (!chainId) {
          return res
            .status(400)
            .json({ success: false, message: "Chain ID is required" });
        }

        const isSepolia = 11155111;
        const isMainnet = 1;

        if (chainId !== isSepolia && chainId !== isMainnet) {
          return res
            .status(400)
            .json({ success: false, message: "Unsupported network" });
        }

        await dbConnect(
          chainId === isSepolia ? "DATABASE_SEPOLIA" : "DATABASE_PRODUCTION"
        );

        if (!amount || !walletAddress || !transactionHash) {
          return res.status(400).json({
            success: false,
            message:
              "Amount, wallet address, and transaction hash are required",
          });
        }

        const user = await User.findOne({ walletAddress });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        if (user.walletAddress !== walletAddress) {
          return res
            .status(403)
            .json({ success: false, message: "Wallet address does not match" });
        }

        if (Number(amount) < 25) {
          return res
            .status(400)
            .json({ success: false, message: "Minimum deposit is 25" });
        }

        const parsedAmount = parseUnits(amount.toString(), 18);

        const balance = await tokenContract.balanceOf(wallet.address);

        if (BigInt(balance.toString()) < BigInt(parsedAmount.toString())) {
          return res
            .status(400)
            .json({ success: false, message: "Insufficient token balance" });
        }

        await waitForTransaction(transactionHash);

        const message = "deposit";
        const signatureDeposit = await signMessage(
          walletAddress,
          BigInt(parsedAmount.toString()),
          tokenAddress,
          message
        );

        user.tokenUnlocked += Number(amount);
        await user.save();

        res.status(200).json({
          success: true,
          data: {
            user,
            amount,
            tokenAddress,
            //signature,
            signatureDeposit,
            cashierAddress,
          },
        });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
};

export default verifyToken(handler);
