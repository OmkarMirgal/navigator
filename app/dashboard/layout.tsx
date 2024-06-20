import React from "react";

import Header from "./_components/layouts/header";
import Sidebar from "./_components/layouts/sidebar";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    // <main className="flex flex-col h-screen">
    //   {/* Top Bar */}
    //   <Header />
    //   {/* Main Content */}
    //   <div className="flex flex-wrap flex-1">
    //     {/* Sidebar */}
    //     <Sidebar />
    //     {/* Main Content */}
    //     <div className="flex-1 bg-red-500 p-4 m-1">{children}</div>
    //   </div>
    // </main>

    // <div className="flex min-h-screen w-full flex-col bg-muted/40">
    //   <Sidebar />
    //   <div className="flex flex-col sm:gap-4 sm:py-3 sm:pl-14 sm:flex-row sm:justify-end">
    //     <Header />
    //   </div>
    //   <div className="flex flex-1 flex-col sm:pl-14">
    //     <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    //       {children}
    //     </main>
    //   </div>
    // </div>

    <div className="grid h-screen w-full pl-[53px]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 gap-4 overflow-auto lg:p-3 p-2 md:p-3 md:grid-cols-3 lg:grid-cols-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
