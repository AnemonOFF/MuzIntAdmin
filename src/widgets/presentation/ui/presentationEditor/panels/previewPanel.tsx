import { Card, CardContent } from "@/shared/ui/card";
import React from "react";

export interface PreviewPanelProps {
  text?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ text }) => {
  return (
    <Card className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%]">
      <CardContent className="w-full h-full flex items-center justify-center p-0">
        <span className="text-xs font-bold break-words">{text}</span>
      </CardContent>
    </Card>
  );
};

export default React.memo(PreviewPanel);
