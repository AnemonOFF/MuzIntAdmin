import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Кажется, это не похоже на Email"),
  password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
});

export interface LoginSchema extends z.infer<typeof loginSchema> {}
