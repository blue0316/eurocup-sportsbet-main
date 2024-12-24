import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import GameCard from "../../lib/models/GameCard";
import User from "../../lib/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { walletAddress, gameCardId, amount, team, chainId } = req.body;

        if (!chainId) {
          return res.status(400).json({
            success: false,
            message: "Chain ID is required",
          });
        }

        const isSepolia = chainId === 11155111; // Sepolia chain ID
        const isMainnet = chainId === 1; // Mainnet chain ID

        if (!isSepolia && !isMainnet) {
          return res.status(400).json({
            success: false,
            message: "Unsupported network",
          });
        }

        await dbConnect(
          isSepolia
            ? ("DATABASE_SEPOLIA" as string)
            : ("DATABASE_PRODUCTION" as string)
        );

        if (!walletAddress || !gameCardId || !amount || !team) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
        }

        const gameCard = await GameCard.findById(gameCardId);

        if (!gameCard) {
          return res
            .status(404)
            .json({ success: false, message: "Game card not found" });
        }

        if (gameCard.status !== "OPEN") {
          return res.status(400).json({
            success: false,
            message: "Cannot place bet on a closed game",
          });
        }

        if (team !== gameCard.team1.name && team !== gameCard.team2.name) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid team specified" });
        }

        const user = await User.findOne({ walletAddress });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        if (user.tokenUnlocked < amount) {
          return res
            .status(400)
            .json({ success: false, message: "Insufficient funds" });
        }

        user.tokenUnlocked -= amount;
        user.tokenLocked += amount;
        await user.save();

        gameCard.bets.push({ user: user.username, amount, team });
        await gameCard.save();

        res.status(200).json({ success: true, data: gameCard });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
