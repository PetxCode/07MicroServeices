import express, { Application, Request, Response } from "express";
import cors from "cors";
import post from "./router/router";

const app: Application = express();
const port: number = 2244;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", post);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Awesome AutPost API",
  });
});

app.listen(port, () => {
  console.log("post server connected");
});
