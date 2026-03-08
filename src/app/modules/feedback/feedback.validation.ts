import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().trim().min(2).max(100),
message: z.string().trim().min(10).max(1000),
});