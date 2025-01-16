import { useTourQuery } from "@/entities/tour";
import { Tour } from "@/shared/types/gamePack";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import React from "react";

export interface TourNameProps {
  id: Tour["id"];
  editing?: boolean;
}

const TourName: React.FC<TourNameProps> = ({ id, editing }) => {
  const { data: tour, isLoading, isSuccess } = useTourQuery(id);

  if (isLoading || !isSuccess)
    return <Skeleton className="h-10 w-28 rounded-md" />;

  return (
    <Input
      id={`tour_${id}_name`}
      type="text"
      value={tour.name}
      disabled={!editing}
    />
  );
};

export default React.memo(TourName);
