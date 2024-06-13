"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Baby,
  BookmarkPlus,
  HandHeart,
  HelpingHand,
  Home,
  LifeBuoy,
  School,
  SquareUser,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePOI } from "@/context/POIContext";
import { Toggle } from "@/components/ui/toggle";

const Sidebar = () => {
  const {
    schulsocialarbeitCoordinates,
    setSchulsocialarbeitCoordinates,
    schulenCoordinates,
    setSchulenCoordinates,
    kindertageseinrichtungenCoordinates,
    setKindertageseinrichtungenCoordinates,
    jugendberufshilfenCoordinates,
    setJugendberufshilfenCoordinates,
  } = usePOI();

  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Link href="/dashboard">
            <Home className="size-5" />
          </Link>
        </Button>
      </div>
      <nav className="grid gap-2 p-2">
        <Toggle
          aria-label="Toggle bold"
          size="sm"
          variant="outline"
          pressed={schulenCoordinates}
          onPressedChange={setSchulenCoordinates}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center rounded-lg">
                <School className="size-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              School
            </TooltipContent>
          </Tooltip>
        </Toggle>

        <Toggle
          aria-label="Toggle bold"
          size="sm"
          variant="outline"
          pressed={schulsocialarbeitCoordinates}
          onPressedChange={setSchulsocialarbeitCoordinates}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center rounded-lg">
                <HandHeart className="size-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              School social work
            </TooltipContent>
          </Tooltip>
        </Toggle>

        <Toggle
          aria-label="Toggle bold"
          size="sm"
          variant="outline"
          pressed={kindertageseinrichtungenCoordinates}
          onPressedChange={setKindertageseinrichtungenCoordinates}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center rounded-lg">
                <Baby className="size-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              childcare facilities
            </TooltipContent>
          </Tooltip>
        </Toggle>

        <Toggle
          aria-label="Toggle bold"
          size="sm"
          variant="outline"
          pressed={jugendberufshilfenCoordinates}
          onPressedChange={setJugendberufshilfenCoordinates}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center rounded-lg">
                <HelpingHand className="size-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Youth career support
            </TooltipContent>
          </Tooltip>
        </Toggle>

        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Models"
            >
              <Bot className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Models
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="API"
            >
              <Code2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            API
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Documentation"
            >
              <Book className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Documentation
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Settings"
            >
              <Settings2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Settings
          </TooltipContent>
        </Tooltip> */}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard">
              <BookmarkPlus className="size-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Set Home Address
          </TooltipContent>
        </Tooltip>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Account"
            >
              <SquareUser className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
