import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const env = envSchema.safeParse(process.env);

export default env;
