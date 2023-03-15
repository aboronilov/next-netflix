import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json("Only GET method is allowed on this endpoint");
  }

  try {
    const { currentUser } = await serverAuth(req);

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return res.status(200).json(favoriteMovies)
  } catch (error: any) {
    console.log(`favorites error: ${error.message}`);
    return res.status(400).json({ err: error.message });
  }
}
