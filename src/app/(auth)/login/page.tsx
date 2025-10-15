"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormPayload, LoginFormSchema } from "@/app/schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoaderCircle, Mail, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormPayload) {
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl: "/",
        });

        if (res?.ok) {
          toast.success("Login successfully", { position: "top-center" });
          router.push("/");
        } else {
          toast.error(res?.error || "Invalid email or password", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Unexpected error happened", {
          position: "top-center",
        });
      }
    });
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <Input
                          placeholder="username@gmail.com"
                          {...field}
                          type="email"
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3">
                        <Lock className="w-4 h-4 text-gray-400 mr-2" />
                        <Input
                          placeholder="************"
                          {...field}
                          type="password"
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
<div className="mb-3">
<Link href="/forgetPass" className="px-1 underline text-blue-800">
Forget Password?
</Link>
</div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 text-base cursor-pointer"
              >
                {isPending ? (
                  <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  "Login"
                )}
              </Button>

              <p className="text-sm text-center text-gray-600">
               {` Don’t have an account?`}
                <a
                  href="/register"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Register
                </a>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
