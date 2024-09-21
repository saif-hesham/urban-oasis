import Constants from "./../constants/constants";
import dotenv from "dotenv";
import { z, ZodError } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(Constants.NODE_ENVS),
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.string().url(),
  UNSPLASH_API_KEY: z.string().min(1, "UNSPLASH_API_KEY is required"),
});

type EnvConfig = z.infer<typeof envSchema>;
let env: EnvConfig;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    console.error("Invalid environment variables:", error.errors);
    process.exit(1);
  } else {
    throw error;
  }
}
export default env;
