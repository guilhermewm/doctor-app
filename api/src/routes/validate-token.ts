import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";

// middleware to validate token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return next(new ErrorHandler(401, "Access denied")); 
  try {
    jwt.verify(token, process.env.TOKEN_SECRET!);
    next();
  } catch (err) {
    return next(new ErrorHandler(400, "Token is not valid"));
  }
};