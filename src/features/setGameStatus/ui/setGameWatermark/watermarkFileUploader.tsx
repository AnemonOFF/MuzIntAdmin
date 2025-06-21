"use client";

import { validImageMIMETypes } from "@/shared/types/mimeTypes";
import { Button } from "@/shared/ui/button";
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
import { IconCloudUpload, IconX } from "@tabler/icons-react";
import React from "react";

export interface WatermarkFileUploaderProps {
  image?: File;
  setImage: (image?: File) => void;
}

const WatermarkFileUploader: React.FC<WatermarkFileUploaderProps> = ({
  setImage,
  image,
}) => {
  return (
    <FileUpload
      value={image ? [image] : []}
      onValueChange={(files) =>
        setImage(files.length > 0 ? files[0] : undefined)
      }
      accept={validImageMIMETypes.join(",")}
      maxFiles={1}
      onFileValidate={(file: File) => {
        if (validImageMIMETypes.includes(file.type.toLowerCase())) {
          if (file.size > 3 * 1024 * 1024)
            return "Изображение должно весить не более 3 МБ";
          return null;
        } else return "Не поддерживаемый тип файла";
      }}
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
        {image && (
          <FileUploadItem value={image}>
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
  );
};

export default React.memo(WatermarkFileUploader);
