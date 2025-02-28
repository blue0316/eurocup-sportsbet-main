import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import GameCard from "../../lib/models/GameCard";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
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

        await dbConnect(
          isSepolia
            ? ("DATABASE_SEPOLIA" as string)
            : ("DATABASE_PRODUCTION" as string)
        );

        const gameCards = await GameCard.find({});
        const bets = gameCards.reduce((acc, gameCard) => {
          return [...acc, ...gameCard.bets];
        }, []);

        if (!gameCards.length) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: bets });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
