"use client";

import { useEffect, useState } from "react";

const useLoadFile = (
  url: string,
  enabled: boolean = true,
  onLoad?: () => void
) => {
  const [isLoaded, setLoaded] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>();

  useEffect(() => {
    setLoaded(false);
    if (!enabled) return;

    (async () => {
      const response = await fetch(url, {
        method: "GET",
      });
      const blob = await response.blob();
      setBlobUrl(window.URL.createObjectURL(blob));
      setLoaded(true);
      if (onLoad) onLoad();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enabled]);

  return {
    isLoaded,
    blobUrl,
  };
};

export default useLoadFile;
