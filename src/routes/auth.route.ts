import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authSchema from "../lib/schemas/auth";
import prisma from "lib/db";
import env from "lib/schemas/env";

const authRouter = Router();

authRouter.get("/user", async () => {
  // TODO
});

authRouter.post("/user/signup", async (req, res) => {
  const { success, data, error } = authSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      success: false,
      error,
    });

    return;
  }

  const {
    first_name,
    last_name,
    department,
    designation,
    email,
    password,
    avatarUrl,
    location,
  } = data;

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(400).json({
      success: false,
      error: "This email is already in use",
    });

    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      first_name,
      last_name,
      designation,
      department,
      email,
      password: hashedPassword,
      location,
      avatarUrl,
    },
  });

  if (newUser.id) {
    const tokenData = {
      id: newUser.id,
      email: newUser.email,
    };

    try {
      const token = await jwt.sign(tokenData, env?.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.cookie("dit-cookie", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        message: "User signed up successfully",
      });

      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        error,
      });
    }
  }
});

export default authRouter;
