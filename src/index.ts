import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";
import { keyRouter } from "./routers/keyRouter";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { fileRouter } from "./routers/fileRouter";

// import expressListRoutes from "express-list-routes";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/leafyLane";
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const app = express();
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/keys", keyRouter);
app.use("/api/files", fileRouter);
// expressListRoutes(app);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
);

const PORT: number = parseInt((process.env.PORT || "4000") as string, 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
