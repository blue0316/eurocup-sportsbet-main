import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import verifyToken from "lib/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  const { addressToken, signatureToken } = req as any;

  try {
    const signerAddress = ethers.verifyMessage(message, signatureToken);

    if (signerAddress.toLowerCase() === addressToken.toLowerCase()) {
      return res.status(200).json({ verified: true });
    } else {
      return res.status(401).json({ verified: false });
    }
  } catch (error: any) {
    return res.status(500).json({ verified: false, error: error.message });
  }
};

export default verifyToken(handler);
