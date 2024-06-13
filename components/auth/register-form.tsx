"use client";
import { useEffect, useState, useTransition } from "react";

import * as z from "zod";
import { axiosApiCall } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { RegisterSchema } from "@/schemas";
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
// import { register } from "@/actions/register";

export const RegisterForm = () => {
  //   const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get("callbackUrl");
  //   const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "Email already in use with different provider!"
  //     : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // error & success messages cleanup after 2.5 secs
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

  // route to /dashboard with delay of 0.5 sec
  const router = useRouter();
  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        router.push("/dashboard");
      }, 500);

      // Cleanup the timeout if the component is unmounted or the success state changes
      return () => clearTimeout(timeoutId);
    }
  }, [success, router]);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    // startTransition(() => {
    //   register(values)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data.error);
    //       }
    //       if (data?.success) {
    //         form.reset();
    //         setSuccess(data.success);
    //       }
    //       //         if (data?.twoFactor) {
    //       //           setShowTwoFactor(true);
    //       //         }
    //     })
    //     .catch(() => setError("Something went wrong"));
    // });

    // axios
    try {
      startTransition(async () => {
        const response = await axiosApiCall(
          "post",
          "auth/register/api",
          values
        );
        const data = response.data;

        if (response.status === 201 && data.success) {
          form.reset();
          setSuccess(data.success);
        } else if (data.error) {
          form.reset();
          setError(data.error);
        }
      });
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )} */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="John Doe"
                          type="text"
                        />
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
                      {/* <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error} />
          {/* <FormError message={error || urlError} /> */}
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Create an account "}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};