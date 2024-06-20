"use client";

import { useEffect, useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { axiosApiCall } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (success || error) {
      const timeoutId = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2500);

      // Cleanup function to clear the timeout if the component unmounts before the delay
      return () => clearTimeout(timeoutId);
    }
  }, [success, error]);

  const router = useRouter();
  useEffect(() => {
    if (success) {
      //refresh the page so middleware would redirect to the /dashboard
      router.refresh();
    }
  }, [success]);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    try {
      startTransition(async () => {
        const response = await axiosApiCall("post", "auth/login/api", values);
        const data = response.data;
        if (response.status === 200 && data.success) {
          setSuccess(data.success);
        } else if (data.error) {
          setError(data.error);
        }
      });
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          {/* <FormError message={error || urlError} /> */}
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
