import express, { Request, Response } from "express";
import "./logging";
import cors from "cors";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { categoryRouter } from "../route/categoryRoute";
import morganMiddleware from "../middleware/morganMiddleware";
import helmet from "helmet";
import { productRouter } from "../route/productRoute";
import { authRouter } from "../route/authRoute";
import { userRouter } from "../route/userRoute";

export const web = express();

web.use(helmet());

web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);
web.options("*", cors());
web.use(morganMiddleware);
web.use(authRouter);
web.use(categoryRouter);
web.use(productRouter);
web.use(userRouter);

web.get("/", (req: Request, res: Response) => {
  res.send("Api Healthy");
});

web.use(errorMiddleware);
