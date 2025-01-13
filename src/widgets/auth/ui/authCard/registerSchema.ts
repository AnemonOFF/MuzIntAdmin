import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Кажется, это не похоже на Email"),
    password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
    confirmPassword: z.string().min(1, "Введите пароль ещё раз"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Пароли должны совпадать",
        path: ["confirmPassword"],
      });
    }
  });

export interface RegisterSchema extends z.infer<typeof registerSchema> {}
