import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../lib/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { chainId } = req.body;

  if (method !== "POST") {
    return res
      .status(400)
      .json({ success: false, message: "Method not allowed" });
  }

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

  try {
    await dbConnect(chainId);

    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}
