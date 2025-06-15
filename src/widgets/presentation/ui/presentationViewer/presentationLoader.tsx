"use client";

import Loader from "@/shared/ui/loader";
import React, { useEffect, useState } from "react";

export interface PresentationLoaderProps {
  isLoading: boolean;
}

const PresentationLoader: React.FC<PresentationLoaderProps> = ({
  isLoading,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShow(false);
      return;
    }
    const timeout = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className="fixed bottom-2 right-2">
      <Loader />
    </div>
  );
};

export default React.memo(PresentationLoader);
