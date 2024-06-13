"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CategoriesFilter } from "../categories-filter";

//added page form
const MapForm = () => {
  return (
    <div className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Filter Categories
        </legend>
        <CategoriesFilter />

        {/* <div className="grid gap-3">
          <Label htmlFor="temperature">Temperature</Label>
          <Input id="temperature" type="number" placeholder="0.4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="top-p">Top P</Label>
            <Input id="top-p" type="number" placeholder="0.7" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="top-k">Top K</Label>
            <Input id="top-k" type="number" placeholder="0.0" />
          </div>
        </div> */}
      </fieldset>
    </div>
  );
};

export default MapForm;
