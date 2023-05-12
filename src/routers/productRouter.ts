import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/productModel";
import { isAuth } from "../utils";

export const productRouter = express.Router();

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);
productRouter.get(
  "/product/:id",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

productRouter.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const createdProduct = await ProductModel.create({
      name: req.body.name,
      slug: req.body.slug,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
    res
      .status(201)
      .json({ message: "Product Created", product: createdProduct });
  })
);
