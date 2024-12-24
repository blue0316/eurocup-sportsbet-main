import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import GameCard from "../../lib/models/GameCard";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { event, team1, team2, date, time, venue, chainId } = req.body;

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

        if (
          !event ||
          !team1 ||
          !team2 ||
          !team1.name ||
          !team1.flag ||
          !team2.name ||
          !team2.flag ||
          !date ||
          !time ||
          !venue
        ) {
          return res.status(400).json({
            success: false,
            message: "Event, Team 1, and Team 2, and their flags are required",
          });
        }

        const gameCard = new GameCard({
          event,
          time_zone: "CEST (UTC+2)",
          team1: { name: team1.name, flag: team1.flag },
          team2: { name: team2.name, flag: team2.flag },
          date,
          time,
          venue,
        });

        await gameCard.save();
        res.status(201).json({ success: true, data: gameCard });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case "GET":
      try {
        const gameCards = await GameCard.find({});
        const now = moment();

        const updatedGameCards = await Promise.all(
          gameCards.map(async (gameCard: any) => {
            const matchDateTime = moment(
              `${gameCard.date} ${gameCard.time}`,
              "YYYY-MM-DD HH:mm"
            );
            if (matchDateTime.isBefore(now) && gameCard.status !== "LOCKED") {
              gameCard.status = "LOCKED";
              await gameCard.save();
            }
            return gameCard;
          })
        );

        res.status(200).json({ success: true, data: updatedGameCards });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
