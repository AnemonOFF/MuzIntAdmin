"use client";

import { useAuthQuery, useLogoutMutation } from "@/entities/user";
import { apiClient } from "@/shared/api/client/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { Skeleton } from "@/shared/ui/skeleton";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import React from "react";

export interface UserSidebarProps {}

const UserSidebar: React.FC<UserSidebarProps> = () => {
  const { data: user, isSuccess } = useAuthQuery();
  const { mutate: logout, isPending: isLogouting } = useLogoutMutation();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isSuccess ? (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="user.png" alt={user.email} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <IconChevronDown className="ml-auto size-4" />
                </>
              ) : (
                <Skeleton className="w-full h-20 rounded-lg" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {isSuccess ? (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="user.png" alt={user.email} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              ) : (
                <Skeleton className="w-full h-20" />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={() =>
                  logout({ refreshToken: apiClient.getRefreshToken()! })
                }
                disabled={isLogouting}
                variant="default"
                className="w-full"
              >
                <IconLogout />
                Выйти
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default React.memo(UserSidebar);
