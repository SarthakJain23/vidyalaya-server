import express, { urlencoded } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./config/config.env",
});
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";

app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is working. Click <a href=${process.env.FRONTEND_URL}> here </a></h1>`
  )
);

app.use(ErrorMiddleware);
