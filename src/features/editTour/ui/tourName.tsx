"use client";

import { useTourQuery, useUpdateTourMutation } from "@/entities/tour";
import { Tour, UpdateTourRequest } from "@/shared/types/tour";
import { DebounceInput } from "@/shared/ui/debounceInput";
import { Skeleton } from "@/shared/ui/skeleton";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export interface TourNameProps {
  id: Tour["id"];
}

const TourName: React.FC<TourNameProps> = ({ id }) => {
  const [value, setValue] = useState<string>();
  const { data: tour, isLoading, isSuccess } = useTourQuery(id);
  const { mutate: update } = useUpdateTourMutation();

  useEffect(() => {
    if (value) {
      const data: UpdateTourRequest = {
        name: value,
      };
      update([id, data], {
        onError: () => toast.error("Не удалось сохранить название тура"),
      });
    }
  }, [id, value, update]);

  if (isLoading || !isSuccess)
    return <Skeleton className="h-10 w-28 rounded-md" />;

  return (
    <DebounceInput
      id={`tour_${id}_name`}
      type="text"
      defaultValue={tour.name}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default React.memo(TourName);
