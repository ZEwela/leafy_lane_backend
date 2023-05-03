import express, { Request, Response } from "express";
import { sampleProducts } from "./data";
import cors from "cors";

const app = express();
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.get("/api/products", (req: Request, res: Response) => {
  res.json(sampleProducts);
});

app.get("/api/products/:slug", (req: Request, res: Response) => {
  const product = sampleProducts.find((p) => p.slug === req.params.slug);
  res.json(product);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
