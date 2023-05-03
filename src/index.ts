import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";
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

app.use("/api/products", productRouter);
app.use("/api/seed", seedRouter);
// expressListRoutes(app);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
