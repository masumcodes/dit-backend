import { Router } from "express";
import authSchema from "../lib/schemas/auth";

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
});

export default authRouter;
