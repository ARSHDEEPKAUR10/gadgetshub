import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

export const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const auth = getAuth(req as any);
  const userId = auth.sessionClaims?.subject;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.locals.userId = userId;
  next();
};