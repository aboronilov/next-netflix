import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json("Only the GET method is allowed on this endpoint");
  }

  try {
    await serverAuth(req);

    const { movieId } = req.query;

    if (!movieId || typeof movieId !== "string") {
      return res.status(400).json("Invalid movieId");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return res.status(404).json(`No movie found with id ${movieId}`);
    }

    return res.status(200).json(movie);
  } catch (error: any) {
    console.log(`Error fetching the movie: ${error.message}`);
    return res.status(500).json({ err: error.message });
  }
}
