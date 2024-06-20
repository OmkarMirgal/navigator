"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Baby, HandHeart, HelpingHand, Home, School } from "lucide-react";
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
        <Link href="/dashboard">
          <Button variant="outline" size="icon" aria-label="Home">
            <Home className="size-5" />
          </Button>
        </Link>
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
                <School className="size-5" color="green" />
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
                <HandHeart className="size-5" color="#ff00ff" />
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
                <Baby className="size-5" color="#ff6600" />
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
                <HelpingHand className="size-5" color="skyblue" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Youth career support
            </TooltipContent>
          </Tooltip>
        </Toggle>
      </nav>
    </aside>
  );
};

export default Sidebar;
