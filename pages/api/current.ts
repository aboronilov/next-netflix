import { NextApiResponse, NextApiRequest } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json("Onle GET method allowed on this endpoint");
  }

  try {
    const { currentUser } = await serverAuth(req);
    return res.status(200).json(currentUser)
  } catch (error: any) {
    console.log(`Current user handler: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}
