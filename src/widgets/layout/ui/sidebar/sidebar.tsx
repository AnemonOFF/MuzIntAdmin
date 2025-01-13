"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import React from "react";
import UserSidebar from "./userSidebar";
import { useAuthQuery } from "@/entities/user";
import { Skeleton } from "@/shared/ui/skeleton";
import { UserRoles } from "@/shared/types/user";
import Link from "next/link";
import { getRolesLinks } from "@/shared/lib/pages";

export interface LayoutSidebarProps
  extends Omit<
    React.ComponentProps<typeof Sidebar>,
    "variant" | "collapsible"
  > {}

const LayoutSidebar: React.FC<LayoutSidebarProps> = ({ ...props }) => {
  const { data: user, isSuccess } = useAuthQuery();

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img src="/vercel.svg" className="size-4" />
            </div>
            <span className="truncate font-semibold">МузИнт</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isSuccess ? (
          <SidebarMenu className="gap-2 p-2">
            {getRolesLinks(user!.roles as unknown as UserRoles[]).map(
              (link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton tooltip={link.title} asChild>
                    <Link href={link.url} className="font-medium">
                      {link.icon}
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        ) : (
          <Skeleton className="rounded-lg w-full h-10" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <UserSidebar />
      </SidebarFooter>
    </Sidebar>
  );
};

export default React.memo(LayoutSidebar);
