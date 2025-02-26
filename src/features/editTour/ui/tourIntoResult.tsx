"use client";

import { useTourQuery, useUpdateTourMutation } from "@/entities/tour";
import { Tour, UpdateTourRequest } from "@/shared/types/tour";
import { Checkbox } from "@/shared/ui/checkbox";
import { Skeleton } from "@/shared/ui/skeleton";
import { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";
import { toast } from "sonner";

export interface TourIntoResultProps {
  id: Tour["id"];
}

const TourIntoResult: React.FC<TourIntoResultProps> = ({ id }) => {
  const { data: tour, isLoading, isSuccess } = useTourQuery(id);
  const { mutate: update, isPending } = useUpdateTourMutation();

  const changeTourIntoResult = (checked: CheckedState) => {
    const data: UpdateTourRequest = {
      takeIntoResult: checked as boolean,
    };
    update([id, data], {
      onError: () =>
        toast.error("Не удалось сохранить учёт в результатах тура"),
    });
  };

  if (isLoading || !isSuccess)
    return <Skeleton className="h-10 w-28 rounded-md" />;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={`tour${id}IntoResult`}
        disabled={isPending}
        defaultChecked={tour.takeIntoResult}
        onCheckedChange={changeTourIntoResult}
      />
      <label htmlFor={`tour${id}IntoResult`}>
        Учитывать в результатах игры
      </label>
    </div>
  );
};

export default React.memo(TourIntoResult);
