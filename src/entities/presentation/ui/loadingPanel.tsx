import { Card, CardContent } from "@/shared/ui/card";
import Loader from "@/shared/ui/loader";
import React from "react";

export interface LoadingPanelProps {}

const LoadingPanel: React.FC<LoadingPanelProps> = ({}) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 p-5 flex items-center justify-center z-20">
      <Card className="w-[50%] h-[50%] overflow-y-auto backdrop-blur-xl bg-background/80">
        <CardContent className="flex items-center justify-center gap-2 w-full h-full p-2 m-0">
          <Loader />
          <span className="text-xl">Загрузка...</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(LoadingPanel);
