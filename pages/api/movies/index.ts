import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json("Onle GET method is allowed on this endpoint");
  }

  try {
    await serverAuth(req);

    const movies = await prismadb.movie.findMany({
      where: {
        type: "Movie",
      },
    });
    return res.status(200).json(movies);
  } catch (error: any) {
    console.log(`Fetch movies error: ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
}
