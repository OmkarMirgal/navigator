// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import React from "react";

// const CategoriesFilter = () => {
//   return (
//     <div className="grid gap-3">
//       {/* <Label htmlFor="model">Model</Label> */}
//       <div className="flex items-center space-x-2">
//         <Switch id="all" />
//         <Label htmlFor="all">All</Label>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Switch id="schulen" />
//         <Label htmlFor="schulen">Schulen</Label>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Switch id="schulsozialarbeit" />
//         <Label htmlFor="schulsozialarbeit">Schulsozialarbeit</Label>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Switch id="jugendberufshilfen" />
//         <Label htmlFor="jugendberufshilfen">Jugendberufshilfen</Label>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Switch id="kindertageseinrichtungen" />
//         <Label htmlFor="kindertageseinrichtungen">
//           Kindertageseinrichtungen
//         </Label>
//       </div>
//     </div>
//   );
// };

// export default CategoriesFilter;
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const FormSchema = z.object({
  all: z.boolean().default(true),
  schulen: z.boolean(),
  schulsozialarbeit: z.boolean(),
  jugendberufshilfen: z.boolean(),
  kindertageseinrichtungen: z.boolean(),
});

export function CategoriesFilter() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      all: true,
      schulen: false,
      schulsozialarbeit: false,
      jugendberufshilfen: false,
      kindertageseinrichtungen: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("values", data);
  }

  //Uncheck the other switches
  const handleAllToggle = (checked: boolean) => {
    form.setValue("all", checked);
    if (checked) {
      form.setValue("schulen", false);
      form.setValue("schulsozialarbeit", false);
      form.setValue("jugendberufshilfen", false);
      form.setValue("kindertageseinrichtungen", false);
    }
  };

  // Uncheck the All Switch
  const handleOtherToggle = (
    fieldName:
      | "schulsozialarbeit"
      | "schulen"
      | "kindertageseinrichtungen"
      | "jugendberufshilfen"
      | "all"
  ) => {
    form.setValue("all", false);
    form.setValue(fieldName, !form.getValues(fieldName));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="all"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="all"
                      checked={field.value}
                      //   onCheckedChange={field.onChange}
                      onCheckedChange={(checked: boolean) =>
                        handleAllToggle(checked)
                      }
                    />
                    <Label htmlFor="all">All</Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schulen"
            render={({ field }) => (
              <FormItem>
                {/* <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div> */}
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="schulen"
                      checked={field.value}
                      //   onCheckedChange={field.onChange}
                      onCheckedChange={() => handleOtherToggle(field.name)}
                    />
                    <Label htmlFor="schulen">Schulen</Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schulsozialarbeit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="schulsozialarbeit"
                      checked={field.value}
                      //   onCheckedChange={field.onChange}
                      onCheckedChange={() => handleOtherToggle(field.name)}
                    />
                    <Label htmlFor="schulsozialarbeit">Schulsozialarbeit</Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kindertageseinrichtungen"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="kindertageseinrichtungen"
                      checked={field.value}
                      //   onCheckedChange={field.onChange}
                      onCheckedChange={() => handleOtherToggle(field.name)}
                    />
                    <Label htmlFor="kindertageseinrichtungen">
                      Kindertageseinrichtungen
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jugendberufshilfen"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="jugendberufshilfen"
                      checked={field.value}
                      //   onCheckedChange={field.onChange}
                      onCheckedChange={() => handleOtherToggle(field.name)}
                    />
                    <Label htmlFor="jugendberufshilfen">
                      Jugendberufshilfen
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
