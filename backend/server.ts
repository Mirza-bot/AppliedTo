import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routes/userRoutes";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Routes
app.use("/api/users", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
