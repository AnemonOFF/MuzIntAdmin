"use client";

import { useCreateSlideMutation } from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Button } from "@/shared/ui/button";
import { IconCloudUpload, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createSlideSchema, CreateSlideSchema } from "./createSlideSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Alert, AlertTitle } from "@/shared/ui/alert";
import axios from "axios";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/shared/ui/file-upload";
import {
  validAudioMIMETypes,
  validImageMIMETypes,
  validVideoMIMETypes,
} from "@/shared/types/mimeTypes";

export interface CreateSlideProps {
  presentationId: Presentation["id"];
  onSuccess?: () => void;
}

const CreateSlide: React.FC<CreateSlideProps> = ({
  presentationId,
  onSuccess,
}) => {
  const { mutate, isPending } = useCreateSlideMutation();
  const [errorMessage, setError] = useState("");
  const form = useForm<CreateSlideSchema>({
    resolver: zodResolver(createSlideSchema),
  });

  const onSubmit = (data: CreateSlideSchema) => {
    setError("");
    mutate(
      {
        presentationId: presentationId,
        content: data.content,
        sound: data.sound,
      },
      {
        onError: (err) => {
          if (axios.isAxiosError(err) && err.response) {
            const errors = Object.values(err.response.data.errors) as string[];
            setError(errors[0]);
          } else {
            setError("Не удалось отправить запрос, попробуйте позже");
          }
        },
        onSuccess: onSuccess,
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Изображение или видео</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value ? [field.value] : []}
                  onValueChange={(files) =>
                    field.onChange(files.length > 0 ? files[0] : undefined)
                  }
                  accept={validImageMIMETypes
                    .concat(validVideoMIMETypes)
                    .join(",")}
                  maxFiles={1}
                  onFileReject={(_, message) => {
                    form.setError("content", {
                      message,
                    });
                  }}
                  onFileValidate={(file: File) => {
                    if (validImageMIMETypes.includes(file.type.toLowerCase())) {
                      if (file.size > 3 * 1024 * 1024)
                        return "Изображение должно весить не более 3 МБ";
                      return null;
                    } else if (
                      validVideoMIMETypes.includes(file.type.toLowerCase())
                    ) {
                      if (file.size > 100 * 1024 * 1024)
                        return "Видео должно весить не более 100 МБ";
                      return null;
                    } else return "Не поддерживаемый тип файла";
                  }}
                  disabled={isPending}
                >
                  <FileUploadDropzone>
                    <IconCloudUpload />
                    Перетащите сюда или
                    <FileUploadTrigger asChild>
                      <Button variant="link" size="sm" className="p-0">
                        выберите файл
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value && (
                      <FileUploadItem value={field.value}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <IconX />
                            <span className="sr-only">Удалить</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    )}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>
                Загрузите изображение (до 3 МБ) или видео (до 100 МБ)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sound"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аудио (не обязательно)</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value ? [field.value] : []}
                  onValueChange={(files) =>
                    field.onChange(files.length > 0 ? files[0] : undefined)
                  }
                  accept={validAudioMIMETypes.join(",")}
                  maxFiles={1}
                  maxSize={10 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError("sound", {
                      message,
                    });
                  }}
                  disabled={isPending}
                >
                  <FileUploadDropzone>
                    <IconCloudUpload />
                    Перетащите сюда или
                    <FileUploadTrigger asChild>
                      <Button variant="link" size="sm" className="p-0">
                        выберите файл
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value && (
                      <FileUploadItem value={field.value}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <IconX />
                            <span className="sr-only">Удалить</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    )}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>Загрузите аудио до 10 МБ</FormDescription>
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
  );
};

export default React.memo(CreateSlide);
