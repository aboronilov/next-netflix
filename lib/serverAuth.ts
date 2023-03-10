import { getSession } from "next-auth/react";
import { NextApiRequest } from "next";

import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("User is not authenticated");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!currentUser) {
    throw new Error("Authentication failure");
  }

  return { currentUser };
};

export default serverAuth;
