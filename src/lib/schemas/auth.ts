import { z } from "zod";

const authSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  designation: z.string(),
  department: z.string(),
  location: z.string(),
  avatarUrl: z.string().url(),
});

export default authSchema;
