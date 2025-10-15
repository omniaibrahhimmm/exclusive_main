// app/forgetPass/page.tsx (or wherever your Forget Password page is)
"use client";

import React from "react";
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
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ForgetPasswordSchema } from "@/app/schema/login.schema";
import { useForgotPassword } from "@/services/forget.services";

export default function ForgetPasswordPage() {
  const { forgotPassword, isPending } = useForgotPassword();  // Use the hook
  const form = useForm({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: { email: string }) => {
    forgotPassword(values.email);  // Call the hook's function with the email
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Forgot Password? 🔒
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Enter your email address and we will send you a link to reset your password.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 text-base cursor-pointer"
              >
                {isPending ? "Sending..." : "Send Reset Link"}
              </Button>

              <p className="text-sm text-center text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}