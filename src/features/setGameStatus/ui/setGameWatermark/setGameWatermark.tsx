/* eslint-disable @next/next/no-img-element */
"use client";

import {
  useDeleteGameWatermarkMutation,
  useGamePresentationQuery,
  useGameQuery,
  useGameStore,
  useSetGameWatermarkMutation,
} from "@/entities/game";
import { Button } from "@/shared/ui/button";
import Modal from "@/shared/ui/modal";
import { IconTrademark } from "@tabler/icons-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import WatermarkFileUploader from "./watermarkFileUploader";
import { cn, getImageSize } from "@/shared/lib/utils";
import { GameStatus } from "@/shared/types/game";
import { SlideType } from "@/shared/types/slide";

export interface SetGameWatermarkProps {}

const SetGameWatermark: React.FC<SetGameWatermarkProps> = ({}) => {
  const [newImage, setNewImage] = useState<File>();
  const [url, setUrl] = useState<string>();
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const [initStyles, setInitStyles] = useState<{
    width: string;
    height: string;
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    translateX?: string;
    translateY?: string;
    rotateDegrees?: string;
  }>();
  const { gameId, status } = useGameStore(
    useShallow((state) => ({
      gameId: state.id,
      status: state.status,
    }))
  );
  const { data: gameData, isSuccess: isGameLoaded } = useGameQuery(
    gameId,
    !!gameId
  );
  const { data: presentationData } = useGamePresentationQuery(gameId);
  const { mutate: setWatermark, isPending: isSettingWatermark } =
    useSetGameWatermarkMutation();
  const { mutate: deleteWatermark, isPending: isDeletingWatermark } =
    useDeleteGameWatermarkMutation();

  const firstImage = presentationData?.slides.find(
    (s) => s.type === SlideType.Image
  )?.fileName;

  useEffect(() => {
    if (!newImage) return;
    const newUrl = URL.createObjectURL(newImage);
    setUrl(newUrl);
    return () => URL.revokeObjectURL(newUrl);
  }, [newImage]);

  useEffect(() => {
    if (!newImage && !gameData?.watermark) return;
    if (gameData?.watermark) {
      setInitStyles({
        width: gameData.watermark.widthPercentage + "%",
        height: gameData.watermark.heightPercentage + "%",
        left: gameData.watermark.leftPercentage + "%",
        top: gameData.watermark.topPercentage + "%",
        right: gameData.watermark.rightPercentage + "%",
        bottom: gameData.watermark.bottomPercentage + "%",
        translateX: gameData.watermark.translateXPercentage + "%",
        translateY: gameData.watermark.translateYPercentage + "%",
        rotateDegrees: gameData.watermark.rotateDegrees + "deg",
      });
    } else {
      (async () => {
        const initSize = await getImageSize(newImage!);
        const initWidth = initSize.width > 200 ? 200 : initSize.width;
        const initHeight = initWidth * (initSize.height / initSize.width);
        setInitStyles({
          height: initHeight + "px",
          width: initWidth + "px",
        });
      })();
    }
  }, [newImage, gameData?.watermark]);

  const onResize = useCallback((e: OnResize) => {
    if (!ref.current) return;
    ref.current.style.transform = e.style.transform;
    ref.current.style.width = e.width + "px";
    ref.current.style.height = e.height + "px";
  }, []);

  const onDrag = useCallback((e: OnDrag) => {
    if (!ref.current) return;
    ref.current.style.left = e.left + "px";
    ref.current.style.top = e.top + "px";
    ref.current.style.right = e.right + "px";
    ref.current.style.bottom = e.bottom + "px";
  }, []);

  const onRotate = useCallback((e: OnRotate) => {
    if (!ref.current) return;
    ref.current.style.transform = e.style.transform;
  }, []);

  const onSubmit = useCallback(() => {
    if (
      !ref.current ||
      !containerRef.current ||
      (!newImage && !gameData?.watermark?.fileName)
    )
      return;
    const width = ref.current.width;
    const height = ref.current.height;
    const left = Number(ref.current.style.left.slice(0, -2));
    const top = Number(ref.current.style.top.slice(0, -2));
    const right = Number(ref.current.style.right.slice(0, -2));
    const bottom = Number(ref.current.style.bottom.slice(0, -2));
    const transform = ref.current.style.transform;

    const translateMatch = transform.match(/translate\(([^)]+)\)/);
    const translateX = translateMatch
      ? parseFloat(translateMatch[1].split(",")[0])
      : 0;
    const translateY = translateMatch
      ? parseFloat(translateMatch[1].split(",")[1])
      : 0;
    const rotateMatch = transform.match(/rotate\(([^)]+)\)/);
    const rotateDegrees = rotateMatch ? parseFloat(rotateMatch[1]) : 0;

    const containerWidth = containerRef.current?.clientWidth;
    const containerHeight = containerRef.current?.clientHeight;

    const widthPercent = (width / containerWidth) * 100;
    const heightPercent = (height / containerHeight) * 100;
    const percentTop = (top / containerHeight) * 100;
    const percentLeft = (left / containerWidth) * 100;
    const percentRight = (right / containerWidth) * 100;
    const percentBottom = (bottom / containerHeight) * 100;
    const percentTranslateX = (translateX / width) * 100;
    const percentTranslateY = (translateY / height) * 100;

    setWatermark(
      {
        gameId: gameId,
        data: {
          widthPercentage: widthPercent.toString(),
          heightPercentage: heightPercent.toString(),
          leftPercentage: percentLeft.toString(),
          topPercentage: percentTop.toString(),
          rightPercentage: percentRight.toString(),
          bottomPercentage: percentBottom.toString(),
          translateXPercentage: percentTranslateX.toString(),
          translateYPercentage: percentTranslateY.toString(),
          rotateDegrees: rotateDegrees.toString(),
        },
        file: newImage,
      },
      {
        onSuccess: () => setOpen(false),
      }
    );
  }, [gameId, setWatermark, newImage, gameData?.watermark]);

  const onDelete = useCallback(() => {
    deleteWatermark(gameId);
  }, [gameId, deleteWatermark]);

  if (status !== GameStatus.WaitForStart) return null;

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Изменить вотермарку"
      trigger={
        <Button
          variant="outline"
          className="w-full"
          disabled={
            !gameData?.isPresentationMode ||
            !presentationData ||
            !presentationData.slides.length
          }
        >
          <IconTrademark /> Изменить вотермарку
        </Button>
      }
      content={
        <div className="space-y-5">
          <WatermarkFileUploader setImage={setNewImage} image={newImage} />
          <div
            ref={containerRef}
            id="watermarkPreviewContainer"
            style={
              { "--image-url": `url(${firstImage})` } as React.CSSProperties
            }
            className={cn(
              "relative w-[600px] aspect-video mx-auto place-self-center border border-black rounded",
              `bg-[image:var(--image-url)] bg-cover bg-center`,
              {
                hidden:
                  !gameData?.watermark && (!newImage || !initStyles || !url),
              }
            )}
          >
            {((newImage && initStyles && url) || !!gameData?.watermark) && (
              <>
                <img
                  ref={ref}
                  src={url ?? gameData?.watermark?.fileName}
                  id="watermarkPreview"
                  alt="Предпросмотр вотермарки"
                  className="absolute"
                  style={{
                    width: initStyles?.width,
                    height: initStyles?.height,
                    left: initStyles?.left,
                    top: initStyles?.top,
                    right: initStyles?.right,
                    bottom: initStyles?.bottom,
                    transform: `translate(${initStyles?.translateX}, ${initStyles?.translateY}) rotate(${initStyles?.rotateDegrees})`,
                  }}
                />
                <Moveable
                  target={ref}
                  draggable
                  onDrag={onDrag}
                  throttleDrag={1}
                  resizable
                  onResize={onResize}
                  throttleResize={1}
                  rotatable
                  onRotate={onRotate}
                  throttleRotate={5}
                  pinchable
                  snappable
                  bounds={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    position: "css",
                  }}
                />
              </>
            )}
          </div>

          <div className="relative grid gap-2 grid-cols-2">
            <Button
              variant="destructive"
              className="w-full"
              onClick={onDelete}
              disabled={
                !isGameLoaded ||
                !gameData.watermark ||
                isDeletingWatermark ||
                isSettingWatermark
              }
            >
              Удалить
            </Button>
            <Button
              className="w-full"
              onClick={onSubmit}
              disabled={isDeletingWatermark || isSettingWatermark}
            >
              Сохранить
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default React.memo(SetGameWatermark);
