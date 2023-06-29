import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes";
import errorHandler from "./middleware/errorMiddleware";
import connectDB from "./config/db";
import applicationRouter from "./routes/applicationRoute";
import documentRouter from "./routes/documentRoute";

const port = process.env.PORT || 5000;

//Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/documents", documentRouter);

// Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
