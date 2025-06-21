"use client";

import { IconX } from "@tabler/icons-react";
import { useUpdateSlideAudioMutation } from "@/entities/presentation";
import { Presentation } from "@/shared/types/presentation";
import { Slide } from "@/shared/types/slide";
import { Button } from "@/shared/ui/button";
import {
  FileUpload,
  FileUploadItemDelete,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
  FileUploadItemMetadata,
} from "@/shared/ui/file-upload";
import Modal from "@/shared/ui/modal";
import { IconCloudUpload, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { validAudioMIMETypes } from "@/shared/types/mimeTypes";

export interface UpdateSlideAudioProps {
  presentationId: Presentation["id"];
  slideId: Slide["id"];
}

const UpdateSlideAudio: React.FC<UpdateSlideAudioProps> = ({
  presentationId,
  slideId,
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState<File>();
  const { mutate, isPending } = useUpdateSlideAudioMutation();

  const updateAudio = () => {
    setError("");
    mutate(
      {
        presentationId: presentationId,
        slideId: slideId,
        audio: value,
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
      title="Изменить аудио слайда"
      trigger={
        <Button variant="outline" className="w-full">
          <IconEdit /> Изменить аудио
        </Button>
      }
      content={
        <div className="space-y-5">
          <p className="bg-muted rounded p-2">
            Внимание! Если сохранить изменения без файла, то аудио на этом
            слайде будет удалено
          </p>
          <FileUpload
            value={value ? [value] : []}
            onValueChange={(files) =>
              setValue(files.length > 0 ? files[0] : undefined)
            }
            accept={validAudioMIMETypes.join(",")}
            maxFiles={1}
            maxSize={10 * 1024 * 1024}
            onFileReject={(_, message) => {
              setError(message);
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
            variant={!value ? "destructive" : "default"}
            onClick={updateAudio}
            disabled={isPending}
          >
            {!value ? "Удалить" : "Изменить"}
          </Button>
        </div>
      }
    />
  );
};

export default React.memo(UpdateSlideAudio);
