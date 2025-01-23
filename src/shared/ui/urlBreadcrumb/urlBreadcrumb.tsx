"use client";

import React from "react";
import useUrlBreadcrumb from "./useUrlBreadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

export interface URLBreadcrumbProps {}

const URLBreadcrumb: React.FC<URLBreadcrumbProps> = ({}) => {
  const breadcrumbs = useUrlBreadcrumb();
  const list = breadcrumbs.map((breadcrumb, i) => (
    <BreadcrumbItem
      className={cn("hidden md:block", {
        "md:block": i !== breadcrumbs.length - 1,
      })}
      key={i}
    >
      {i === breadcrumbs.length - 1 ? (
        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink asChild>
          <Link href={breadcrumb.url}>{breadcrumb.title}</Link>
        </BreadcrumbLink>
      )}
    </BreadcrumbItem>
  ));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {([] as React.ReactNode[])
          .concat(
            ...list.map((n, i) => [
              n,
              <BreadcrumbSeparator
                className="hidden md:block"
                key={`${i}_separator`}
              />,
            ])
          )
          .slice(0, -1)}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default React.memo(URLBreadcrumb);
