"use client";
import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { axiosApiCall } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const baseSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
});

export function UserSettingsForm({ user }: any) {
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false);
  const [formSchema, setFormSchema] = useState(baseSchema);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: showPasswordFields ? "" : undefined,
      newPassword: showPasswordFields ? "" : undefined,
    },
  });

  useEffect(() => {
    if (showPasswordFields) {
      // Extend base schema with password fields
      const updatedSchema = baseSchema.extend({
        currentPassword: z.string().min(1, {
          message: "Current password is required",
        }),
        newPassword: z.string().min(6, {
          message: "New password must be at least 6 characters",
        }),
      });
      setFormSchema(updatedSchema);
    } else {
      setFormSchema(baseSchema);
    }
  }, [showPasswordFields]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      startTransition(async () => {
        const response = await axiosApiCall("post", "dashboard/user/api", data);
        const res_data = response.data;
        if (response.status === 200 && res_data.success) {
          toast.success(res_data.success);
          form.reset({
            ...data,
            currentPassword: "",
            newPassword: "",
          });
        } else if (res_data.error) {
          form.reset({
            ...data,
            currentPassword: "",
            newPassword: "",
          });
          toast.error(res_data.error);
        }
      });
    } catch (error: any) {
      toast.error("Something went wrong!" + error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Change Password</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Switch
                  id="changePasswordToggle"
                  checked={showPasswordFields}
                  onCheckedChange={(checked) => {
                    setShowPasswordFields(checked);
                  }}
                />
                <Label htmlFor="changePasswordToggle">Change Password</Label>
              </div>
            </FormControl>
          </FormItem>

          {showPasswordFields && (
            <>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Current Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="New Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
