"use client";

import { useAuthQuery } from "@/entities/user";
import Loader from "@/shared/ui/loader";
import { Separator } from "@/shared/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { URLBreadcrumb } from "@/shared/ui/urlBreadcrumb";
import { LayoutSidebar } from "@/widgets/layout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSuccess } = useAuthQuery();

  if (!isSuccess)
    return (
      <div className="w-screen min-h-screen p-5 flex items-center justify-center">
        <Loader text="Загрузка..." />
      </div>
    );

  return (
    <SidebarProvider>
      <LayoutSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <URLBreadcrumb />
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
