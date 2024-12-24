import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../lib/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const { username, walletAddress, chainId } = req.body;

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

  switch (method) {
    case "POST":
      try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
          return res
            .status(400)
            .json({ success: false, message: "Username already exists" });
        }

        const user = new User({ username, walletAddress });
        await user.save();
        res.status(201).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Method not allowed" });
      break;
  }
}
