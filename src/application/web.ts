import express from "express";
import "./logging";
import cors from "cors";

export const web = express();
web.use(express.json());
web.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);
web.options("*", cors());

web.get("/test", (req, res) => {
    res.send("hello world")
})
