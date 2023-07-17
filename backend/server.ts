import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes";
import errorHandler from "./middleware/errorMiddleware";
import connectDB from "./config/db";
import applicationRouter from "./routes/applicationRoute";
import documentRouter from "./routes/documentRoute";
import path from "path";

const port = process.env.PORT || 5000;

//Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://appliedto-ats.onrender.com",
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/documents", documentRouter);

// Middleware
app.use(errorHandler);

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./dist")));

  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.join(__dirname, "./dist/index.html"), {}, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error sending file");
      }
    })
  );
} else {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the AppliedTo API" });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
