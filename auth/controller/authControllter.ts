import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const createUser = await prisma.authModel.create({
      data: {
        userName,
        email,
        password,
      },
    });

    return res.status(201).json({
      message: "user created",
      data: createUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.authModel.findUnique({
      where: { email },
    });

    if (user) {
      const token = jwt.sign({ id: user.id }, "tokenSecret");

      const newToken = `${uuid()}%${token}`;

      req.headers.authorization = `Bearer CodeLab ${newToken}`;

      return res.status(201).json({
        message: "welcome back user",
        data: newToken,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const createUser = await prisma.authModel.findMany({});

    return res.status(200).json({
      message: "view all user ",
      data: createUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
