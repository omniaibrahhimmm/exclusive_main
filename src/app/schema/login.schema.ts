import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "please enter a valid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
});

// في app/schema/forgot-password.schema.ts

export const ForgetPasswordSchema = z.object({
  email: z.string().email({ message: "بريد إلكتروني غير صالح" }),
});

export type LoginFormPayload = z.infer<typeof LoginFormSchema>;
