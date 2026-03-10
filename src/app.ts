import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import feedbackRoutes from "./app/modules/feedback/feedback.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { envVars } from "./app/config/env";


 const app = express();


app.use(
  cors({
    origin: [envVars.CLIENT_URL, envVars.CLIENT_URL_PROD],
     credentials: true,
   })
);

app.use(express.json());
app.use(cookieParser());
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));


app.use("/api/feedback",feedbackRoutes);


app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to Headless Tech Server!');
});

app.use(globalErrorHandler);

export default app;