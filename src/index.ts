import express from "express";
import morgan from "morgan";
import env from "./lib/schemas/env";
import authRouter from "./routes/auth.route";

const app = express();
app.use(morgan("dev"));

// Routes
app.use("/auth", authRouter);

app.listen(env?.PORT || 3000, () => {
  console.log(`Server running on PORT: ${3000}`);
});
