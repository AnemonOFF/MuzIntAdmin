"use client";

import { pages } from "@/shared/lib/pages";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useUrlBreadcrumb = () => {
  const path = usePathname();
  const [breadcrumb, setBreadcrumb] = useState<
    {
      title: string;
      url: string;
    }[]
  >([]);

  useEffect(() => {
    const parts = path.split("/");
    const res = Array(parts.length)
      .fill(0)
      .map((_, i) => parts.slice(0, i + 1))
      .map((x) => ({
        url: "/" + x.join("/"),
        title:
          pages.find((p) => p.url === "/" + x[x.length - 1])?.title ??
          x[x.length - 1],
      }));
    setBreadcrumb(res);
  }, [path]);

  return breadcrumb;
};

export default useUrlBreadcrumb;
