import React from "react";
import { UserSettings } from "./user-settings";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    // <header className="flex justify-between items-center px-4 py-2 bg-gray-900 text-white">
    //   {/* Logo */}
    //   <div className="flex items-center">
    //     <Image
    //       src={"nav-logo.svg"}
    //       alt="logo"
    //       width={45}
    //       height={45}
    //       className="bg-white p-1 rounded"
    //     />
    //     <span className=" p-1 text-lg font-semibold">avigator</span>
    //   </div>
    //   {/* Avatar */}
    //   {/* <div className="flex items-center">
    //     <img src="avatar.png" alt="Avatar" className="h-8 rounded-full" />
    //   </div> */}
    //   <UserSettings />
    // </header>

    // <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 justify-between">
    //   <Sheet>
    //     <SheetTrigger asChild>
    //       <Button size="icon" variant="outline" className="sm:hidden">
    //         <PanelLeft className="h-5 w-5" />
    //         <span className="sr-only">Toggle Menu</span>
    //       </Button>
    //     </SheetTrigger>
    //     <SheetContent side="left" className="sm:max-w-xs">
    //       <nav className="grid gap-6 text-lg font-medium">
    //         <Link
    //           href="#"
    //           className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
    //         >
    //           <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
    //           <span className="sr-only">Acme Inc</span>
    //         </Link>
    //         <Link
    //           href="#"
    //           className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    //         >
    //           <Home className="h-5 w-5" />
    //           Dashboard
    //         </Link>
    //         <Link
    //           href="#"
    //           className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    //         >
    //           <ShoppingCart className="h-5 w-5" />
    //           Orders
    //         </Link>
    //         <Link
    //           href="#"
    //           className="flex items-center gap-4 px-2.5 text-foreground"
    //         >
    //           <Package className="h-5 w-5" />
    //           Products
    //         </Link>
    //         <Link
    //           href="#"
    //           className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    //         >
    //           <Users2 className="h-5 w-5" />
    //           Customers
    //         </Link>
    //         <Link
    //           href="#"
    //           className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    //         >
    //           <LineChart className="h-5 w-5" />
    //           Settings
    //         </Link>
    //       </nav>
    //     </SheetContent>
    //   </Sheet>

    //   <UserSettings />
    // </header>

    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">🧭 Navigator</h1>
      {/* <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Configuration</DrawerTitle>
            <DrawerDescription>
              Configure the settings for the model and messages.
            </DrawerDescription>
          </DrawerHeader>
          <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="model">Model</Label>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="temperature">Temperature</Label>
                <Input id="temperature" type="number" placeholder="0.4" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Messages
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
              </div>
            </fieldset>
          </form>
        </DrawerContent>
      </Drawer> */}
      <div className="flex ml-auto align-middle">
        <UserSettings />
      </div>
    </header>
  );
};

export default Header;
