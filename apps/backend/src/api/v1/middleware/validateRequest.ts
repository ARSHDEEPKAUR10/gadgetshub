import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationErrorItem } from "joi";

export const validateRequest =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: "Validation failed",
        details: error.details.map((detail: ValidationErrorItem) => detail.message),
      });
      return;
    }

    next();
  };
  