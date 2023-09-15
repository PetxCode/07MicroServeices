import express, { Application, Request, Response } from "express";
import cors from "cors";
import auth from "./router/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app: Application = express();
const port: number = 2233;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", auth);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Awesome Auth API",
  });
});

app.listen(port, () => {
  console.log("auth server connected");
});
import amqp from "amqplib";
const amqpServer = "amqp://localhost:5672";
let channel: any;
let connect: any;

const connection = async () => {
  try {
    connect = await amqp.connect(amqpServer);
    channel = await connect.createChannel();

    await channel.assertQueue("postings");

    await channel.consume("postings", async (message: any) => {
      let viewMGS = JSON.parse(message.content.toString());

      const user: any = await prisma.authModel.findUnique({
        where: { id: viewMGS.userID },
      });

      user?.myPosts?.push(viewMGS);

      const post = await prisma.authModel.update({
        where: { id: viewMGS.userID },
        data: {
          myPosts: user?.myPosts,
        },
      });

      console.log("who are you: ", post);

      await channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
};

connection();
