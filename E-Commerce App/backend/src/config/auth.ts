import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export interface AuthRequest extends Request {
  user?: any;
}

const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, "Tushar@123") as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("Invalid Token");
      return;
    }
    req.user = user;
    next();
  } else {
    return res.send("<h2>Something Went Wrong!!</h2>");
  }
};

export default verifyToken;
