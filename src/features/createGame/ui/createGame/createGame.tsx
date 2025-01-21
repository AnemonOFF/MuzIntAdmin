import { useCreateGameMutation } from "@/entities/game";
import React, { useEffect, useState } from "react";
import { createGameSchema, CreateGameSchema } from "./createGameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Alert, AlertTitle } from "@/shared/ui/alert";
import { DateTimePicker } from "@/shared/ui/dateTimePicker";
import { useGamePacksQuery } from "@/entities/gamePack";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { toast } from "sonner";

export interface AddGameProps {}

const CreateGame: React.FC<AddGameProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const { data: gamePacks, isSuccess: areGamePacksLoaded } =
    useGamePacksQuery();
  const { mutate: createGame, isPending, error } = useCreateGameMutation();
  const [errorMessage, setError] = useState("");
  const form = useForm<CreateGameSchema>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (error && axios.isAxiosError(error) && error.response) {
      const errors = Object.values(error.response.data.errors) as string[];
      setError(errors[0]);
    } else {
      setError("Не удалось отправить запрос, попробуйте позже");
    }
  }, [error]);

  const onSubmit = (data: CreateGameSchema) => {
    setError("");
    createGame(
      {
        gamePackId: data.gamePackId,
        name: data.name,
        startTimeUTC: data.startTimeUTC,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success(
            "Игра успешно создана! Вы увидите её после того, как администратор одобрит её.",
            { richColors: true, duration: 15000 }
          );
        },
      }
    );
  };

  return (
    <Modal
      trigger={<Button variant="outline">Создать</Button>}
      title="Создание игры"
      open={open}
      onOpenChange={setOpen}
      content={
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 md:min-w-96"
          >
            <FormField
              control={form.control}
              name="gamePackId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пакет игры</FormLabel>
                  {areGamePacksLoaded ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите пакет игры" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gamePacks.map((gp) => (
                          <SelectItem value={gp.id.toString()} key={gp.id}>
                            {gp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Skeleton className="w-full h-10 rounded-md" />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Название"
                      disabled={isPending}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTimeUTC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Начало</FormLabel>
                  <FormDescription>
                    Время указывайте в вашем часовом поясе
                  </FormDescription>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      fromDate={new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Создать
            </Button>
            {errorMessage && (
              <Alert className="bg-red-400/20">
                <AlertTitle>{errorMessage}</AlertTitle>
              </Alert>
            )}
          </form>
        </Form>
      }
    />
  );
};

export default React.memo(CreateGame);
