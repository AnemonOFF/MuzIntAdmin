import { z } from "zod";

export const createGameSchema = z.object({
  gamePackId: z
    .string({ required_error: "Выберите пакет игры" })
    .nonempty("Выберите пакет игры")
    .transform((id) => parseInt(id)),
  startTimeUTC: z
    .date({ required_error: "Выберите время начала игры" })
    .min(new Date(), "Время начала должно быть после текущего момента"),
  name: z.string().nonempty("Введите название игры"),
});

export interface CreateGameSchema extends z.infer<typeof createGameSchema> {}
