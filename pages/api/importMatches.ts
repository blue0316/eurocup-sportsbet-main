import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import GameCard from "../../lib/models/GameCard";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { file, chainId } = req.body;

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

        if (!file) {
          return res
            .status(400)
            .json({ success: false, message: "File is required" });
        }

        const base64Data = file.split(";base64,").pop();
        if (!base64Data) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid file format" });
        }

        const fileBuffer = Buffer.from(base64Data, "base64");
        const fileData = fileBuffer.toString("utf-8");
        const matches = JSON.parse(fileData).matches;
        const titleEvent = JSON.parse(fileData);

        const gameCards = matches.map((match: any) => ({
          event: titleEvent.tournament, //`${match.team1} vs ${match.team2}`,
          time_zone: titleEvent.time_zone,
          team1: {
            name: match.team1.name,
            flag: match.team1.flag,
          },
          team2: {
            name: match.team2.name,
            flag: match.team2.flag,
          },
          date: match.date,
          time: match.time,
          venue: match.venue,
        }));

        await GameCard.insertMany(gameCards);

        res
          .status(201)
          .json({ success: true, message: "Matches imported successfully!" });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
