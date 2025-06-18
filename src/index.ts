import express from "express";
import morgan from "morgan";
import env from "./lib/schemas/env";
import authRouter from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRouter);

const port = env?.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
