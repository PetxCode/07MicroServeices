import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import amqp from "amqplib";
const amqpServer = "amqp://localhost:5672";
let channel: any;
let connect: any;

const prisma = new PrismaClient();

export const createPost = async (req: any, res: Response) => {
  try {
    const { message, userID } = req.body;
    const { id } = req.user;

    const post = await prisma.postModel.create({
      data: {
        message,
        userID: id,
      },
    });

    const connection = async () => {
      try {
        connect = await amqp.connect(amqpServer);
        channel = await connect.createChannel();

        await channel.sendToQueue(
          "postings",
          Buffer.from(JSON.stringify(post))
        );

        // await channel.consume("posting", async (messsage: any) => {
        //   console.log(messsage);
        // });
      } catch (error) {
        console.log(error);
      }
    };

    connection();

    await channel.sendToQueue("posted", Buffer.from(JSON.stringify(post)));

    return res.status(201).json({
      message: "post created",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const post = await prisma.postModel.findMany({});

    return res.status(200).json({
      message: "view all post ",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
