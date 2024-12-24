import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../lib/models/User";
import GameCard from "../../lib/models/GameCard";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { walletAddress } = req.query;
  const { chainId } = req.body;

  switch (method) {
    case "POST":
      try {
        if (!chainId) {
          return res.status(400).json({
            success: false,
            message: "Chain ID is required",
          });
        }

        const isSepolia = chainId === 11155111;
        const isMainnet = chainId === 1;

        if (!isSepolia && !isMainnet) {
          return res.status(400).json({
            success: false,
            message: "Unsupported network",
          });
        }

        await dbConnect(chainId);

        if (!walletAddress) {
          return res
            .status(400)
            .json({ success: false, message: "Wallet address is required" });
        }

        const user = await User.findOne({ walletAddress });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        const gameCards = await GameCard.find({ "bets.user": user.username });

        res.status(200).json({ success: true, data: { user, gameCards } });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
