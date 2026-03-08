import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import feedbackRoutes from "./app/modules/feedback/feedback.route";


 const app = express();

// Middlewares
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     // origin: 'https://digital-wallet-client-beta.vercel.app',
//      credentials: true,
//    })
// );

app.use(express.json());
app.use(cookieParser());
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));


app.use("/api/feedback",feedbackRoutes);


app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to Headless Tech Server!');
});

// app.use(errorHandler);

export default app;