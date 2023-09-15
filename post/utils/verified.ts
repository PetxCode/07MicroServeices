import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verified = (req: any, res: Response, next: NextFunction) => {
  try {
    const myToken = req.headers.authorization;

    if (myToken) {
      const token = myToken.split(" ")[2];

      if (token) {
        const realToken = token.split("%")[1];

        jwt.verify(realToken, "tokenSecret", (error: any, payload: any) => {
          if (error) {
            return res.status(404).json({
              message: "Invalid Token",
            });
          } else {
            req.user = payload;
            next();
          }
        });
      } else {
        return res.status(404).json({
          message: "Invalide Token",
        });
      }
    } else {
      return res.status(404).json({
        message: "You are not unauthorized for this",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
