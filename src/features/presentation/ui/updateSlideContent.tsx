"use client";

import {
  MIMETypes,
  useUpdateSlideContentMutation,
} from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import { Button } from "@/shared/ui/button";
import {
  FileUpload,
  FileUploadItemPreview,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
  FileUploadTrigger,
  FileUploadItemMetadata,
  FileUploadItemDelete,
} from "@/shared/ui/file-upload";
import Modal from "@/shared/ui/modal";
import { IconCloudUpload, IconEdit, IconX } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";

export interface UpdateSlideContentProps {
  presentationId: Presentation["id"];
  slideId: Slide["id"];
}

const UpdateSlideContent: React.FC<UpdateSlideContentProps> = ({
  presentationId,
  slideId,
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState<File>();
  const { mutate, isPending } = useUpdateSlideContentMutation();

  const updateContent = () => {
    if (!value) {
      setError("Выберите файл");
      return;
    }
    setError("");
    mutate(
      {
        presentationId: presentationId,
        slideId: slideId,
        content: value,
      },
      {
        onSuccess: () => setOpen(false),
        onError: (err) => {
          if (axios.isAxiosError(err) && err.response) {
            const errors = Object.values(err.response.data.errors) as string[];
            setError(errors[0]);
          } else {
            setError("Не удалось отправить запрос, попробуйте позже");
          }
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Изменить контент слайда"
      trigger={
        <Button variant="outline" className="w-full">
          <IconEdit /> Изменить контент
        </Button>
      }
      content={
        <div className="space-y-5">
          <FileUpload
            value={value ? [value] : []}
            onValueChange={(files) =>
              setValue(files.length > 0 ? files[0] : undefined)
            }
            accept={MIMETypes.validImageMIMETypes
              .concat(MIMETypes.validVideoMIMETypes)
              .join(",")}
            maxFiles={1}
            onFileReject={(_, message) => {
              setError(message);
            }}
            onFileValidate={(file: File) => {
              if (
                MIMETypes.validImageMIMETypes.includes(file.type.toLowerCase())
              ) {
                if (file.size > 3 * 1024 * 1024)
                  return "Изображение должно весить не более 3 МБ";
                return null;
              } else if (
                MIMETypes.validVideoMIMETypes.includes(file.type.toLowerCase())
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
              {value && (
                <FileUploadItem value={value}>
                  <FileUploadItemPreview />
                  <FileUploadItemMetadata />
                  <FileUploadItemDelete asChild>
                    <Button variant="ghost" size="icon" className="size-7">
                      <IconX />
                      <span className="sr-only">Удалить</span>
                    </Button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              )}
            </FileUploadList>
          </FileUpload>
          {error && <p className="text-destructive">{error}</p>}
          <Button
            className="w-full"
            onClick={updateContent}
            disabled={isPending || !value}
          >
            Изменить
          </Button>
        </div>
      }
    />
  );
};

export default React.memo(UpdateSlideContent);
