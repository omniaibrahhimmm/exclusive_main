"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FormState,
  RegisterFormPayload,
  RegisterFormSchema,
} from "@/app/schema/register.schema";
import { HandleRegister } from "@/services/Register.service";
import { useActionState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const initialFormState: FormState = {
    success: false,
    error: {},
    message: null,
  };

  // ✅ useActionState بيرجع (state + action)
  const [action, formAction] = useActionState(HandleRegister, initialFormState);

  // ✅ pending من useTransition
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormPayload>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }
      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    }
  }, [action, router]);

  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-center text-2xl font-bold mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-8">
          Sign up to get started 🚀
        </p>

        <Form {...form}>
          <form
            action={(formData) => startTransition(() => formAction(formData))}
            className="space-y-6"
          >
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Omnia Ibrahim" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* confirm password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01012345678"
                      {...field}
                      type="tel"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
