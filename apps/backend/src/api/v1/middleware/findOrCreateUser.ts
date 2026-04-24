import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import prisma from "../../../lib/prisma";

export async function findOrCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const auth = getAuth(req);
    const clerkUserId = auth.userId;

    if (!clerkUserId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {},
      create: { clerkUserId },
    });

    res.locals.user = {
      id: user.id,
      clerkUserId: user.clerkUserId,
    };

    next();
  } catch (error) {
    next(error);
  }
}