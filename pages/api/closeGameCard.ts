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
        const { gameCardId, result, chainId } = req.body;

        if (!chainId) {
          return res
            .status(400)
            .json({ success: false, message: "Chain ID is required" });
        }

        const isSepolia = 11155111;
        const isMainnet = 1;

        if (!isSepolia && !isMainnet) {
          return res
            .status(400)
            .json({ success: false, message: "Unsupported network" });
        }

        await dbConnect(chainId);

        if (!gameCardId || !result) {
          return res.status(400).json({
            success: false,
            message: "Game card ID and result are required",
          });
        }

        const gameCard = await GameCard.findById(gameCardId);

        if (!gameCard) {
          return res
            .status(404)
            .json({ success: false, message: "Game card not found" });
        }

        if (gameCard.status === "RESULT") {
          return res
            .status(400)
            .json({ success: false, message: "Game card is already closed" });
        }

        gameCard.status = "RESULT";
        gameCard.result = result;

        const totalPool = gameCard.bets.reduce(
          (sum: number, bet: { amount: number }) => sum + bet.amount,
          0
        );
        const winningPool = totalPool * 0.95;
        const winners = gameCard.bets.filter(
          (bet: { team: string }) => bet.team === result
        );

        const totalWinningBets = winners.reduce(
          (sum: number, bet: { amount: number }) => sum + bet.amount,
          0
        );

        for (const winner of winners) {
          const user = await User.findOne({ username: winner.user });

          if (user) {
            const userShare = (winner.amount / totalWinningBets) * winningPool;
            user.tokenUnlocked += userShare;
            user.tokenLocked -= winner.amount;
            await user.save();
          }
        }

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
