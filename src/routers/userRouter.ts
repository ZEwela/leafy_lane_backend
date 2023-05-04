import express, { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";

export const userRouter: Router = express.Router();

userRouter.post(
  "/signin",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response) => {
    const exist = await UserModel.findOne({ email: req.body.email });
    if (exist) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
    return;
  })
);
