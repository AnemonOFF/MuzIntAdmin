"use client";

import React, { useState } from "react";
import { cn } from "../lib/utils";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

export interface CopyTextProps {
  text: string;
  className?: string;
}

const CopyText: React.FC<CopyTextProps> = ({ text, className }) => {
  const [isActive, setActive] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setActive(true);
    setTimeout(() => setActive(false), 3000);
  };

  return (
    <div
      className={cn(
        "cursor-pointer border gap-2 flex items-center justify-between rounded-md p-2 transition-all hover:border-black",
        { "!border-green-300": isActive },
        className
      )}
      onClick={copy}
    >
      <span>{text}</span>
      {isActive ? (
        <IconCopyCheck className="text-green-300 transition-all" />
      ) : (
        <IconCopy className="transition-all" />
      )}
    </div>
  );
};

export default React.memo(CopyText);
