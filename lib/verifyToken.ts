import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const verifyToken =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ verified: false, error: "No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = Buffer.from(token, "base64").toString();
      const [address, signature] = decodedToken.split(":");

      if (!address || !signature) {
        throw new Error("Invalid token format");
      }

      (req as any).addressToken = address;
      (req as any).signatureToken = signature;

      return handler(req, res);
    } catch (error) {
      return res
        .status(400)
        .json({ verified: false, error: "Invalid token format" });
    }
  };

export default verifyToken;
