import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json("Only POST method is allowed on this endpoint");
  }

  try {
    const { email, name, password } = req.body;

    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(422)
        .json({ error: "User with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(201).json(user)
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
