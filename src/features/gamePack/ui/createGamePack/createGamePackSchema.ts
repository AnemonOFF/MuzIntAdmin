import { z } from "zod";

export const createGamePackSchema = z.object({
  name: z.string().nonempty(),
  excel: z.instanceof(File).optional(),
});

export interface CreateGamePackSchema
  extends z.infer<typeof createGamePackSchema> {}
