import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import prisma from "../../../lib/prisma";

export async function findOrCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const auth = getAuth(req as any) as any;
    const clerkUserId = auth?.userId;

    console.log("clerkUserId:", clerkUserId);

    if (!clerkUserId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { clerkUserId },
      });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
}