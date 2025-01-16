"use client";

import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createGamePackSchema,
  CreateGamePackSchema,
} from "./createGamePackSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateGamePackMutation,
  useUploadGamePackMutation,
} from "@/entities/gamePack";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Alert, AlertTitle } from "@/shared/ui/alert";
import Image from "next/image";
import excelTemplate from "./excelTemplate.png";
import { useRouter } from "next/navigation";
import { FullGamePack } from "@/shared/types/gamePack";

export interface CreateGamePackProps {}

const CreateGamePack: React.FC<CreateGamePackProps> = ({}) => {
  const router = useRouter();
  const {
    mutate: createGamePack,
    isPending: isCreating,
    error: createError,
  } = useCreateGamePackMutation();
  const {
    mutate: uploadGamePack,
    isPending: isUploading,
    error: uploadError,
  } = useUploadGamePackMutation();
  const [errorMessage, setError] = useState("");
  const form = useForm<CreateGamePackSchema>({
    resolver: zodResolver(createGamePackSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (createError && axios.isAxiosError(createError)) {
      if (createError.response?.data.title)
        setError(createError.response.data.title);
    }
  }, [createError]);

  useEffect(() => {
    if (uploadError && axios.isAxiosError(uploadError)) {
      if (uploadError.response?.data.title)
        setError(uploadError.response.data.title);
    }
  }, [uploadError]);

  const onSubmit = (data: CreateGamePackSchema) => {
    setError("");
    const onSuccess = (data: FullGamePack) =>
      router.push(`/gamepacks/${data.id}`);
    if (data.excel) {
      uploadGamePack(
        {
          file: data.excel,
          name: data.name,
        },
        {
          onSuccess: onSuccess,
        }
      );
    } else {
      createGamePack(
        {
          name: data.name,
        },
        {
          onSuccess: onSuccess,
        }
      );
    }
  };

  return (
    <Modal
      trigger={<Button>Создать</Button>}
      title="Создание пака игры"
      content={
        <div className="flex gap-2 max-md:flex-col">
          <Image
            alt="Шаблон Excel файла"
            src={excelTemplate}
            className="object-contain max-md:mx-auto"
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <p>
                Чтобы загрузить пак игры из Excel файла (.xlsx), используйте
                формат как на изображении (туры на разных страницах, а блоки
                разделены пустыми строками).
              </p>
              <p>
                Если хотите создать вручную, не прикрепляйте файл. Настроить
                можно будет дальше.
              </p>
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
                        disabled={isUploading || isCreating}
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excel"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Excel файл</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Excel"
                        disabled={isUploading || isCreating}
                        onChange={(event) => {
                          if (event.target.files)
                            onChange(event.target.files[0]);
                        }}
                        required={false}
                        {...field}
                      />
                    </FormControl>
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
        </div>
      }
    />
  );
};

export default React.memo(CreateGamePack);
