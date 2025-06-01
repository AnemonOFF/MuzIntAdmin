import { z } from "zod";

export const createSlideSchema = z.object({
  content: z.instanceof(File),
  sound: z.instanceof(File).optional(),
});

export interface CreateSlideSchema extends z.infer<typeof createSlideSchema> {}
