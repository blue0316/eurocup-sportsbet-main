import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = "HaAuVtTy-ygjFZ3Orw-umSg-sJqikqgmakO"; //process.env.NEXT_PUBLIC_API_KEY;

  try {
    const response = await fetch(
      "https://api.tokendata.live/v3/token/0x32F0D04B48427A14Fb3Cbc73DB869e691A9feC6f/price",
      {
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );

    const dataResponse = await response.json();
    res.status(200).json({ priceUsdt: dataResponse });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
