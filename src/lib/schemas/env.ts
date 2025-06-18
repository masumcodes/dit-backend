import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const { data: env } = envSchema.safeParse(process.env);

export default env;
