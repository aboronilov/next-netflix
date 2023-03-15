import { without } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { currentUser } = await serverAuth(req);
    const { movieId } = req.body;

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return res.status(404).json(`No movie found with id ${movieId}`);
    }

    if (req.method === "POST") {
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email as string,
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(user)
    }

    return res.status(405).json("Only POST and DELETE methods are allowed on this endpoint")
  } catch (error: any) {
    console.log(`favorite api error: ${error.message}`);
    return res.status(400).json({ err: error.message });
  }
}
