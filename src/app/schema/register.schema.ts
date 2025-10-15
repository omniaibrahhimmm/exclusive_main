import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters long" }),

    email: z
      .string()
      .email({ message: "Please enter a valid email address" }),

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
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      }),

    rePassword: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .min(8, {
        message: "Confirm password must be at least 8 characters long",
      })
      .regex(/[A-Z]/, {
        message: "Confirm password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Confirm password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Confirm password must contain at least one number",
      })
      .regex(/[\W_]/, {
        message: "Confirm password must contain at least one special character",
      }),

    phone: z
      .string()
      .nonempty({ message: "Phone is required" })
      .regex(/^(?:\+20|0)?1[0125]\d{8}$/, {
        message: "Please enter a valid Egyptian phone number",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], // يربط الرسالة بـ rePassword
  });

export type RegisterFormPayload = z.infer<typeof RegisterFormSchema>;

// ✅ اسم الـ type بقى FormState
export type FormState = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
};

export const formStateType = {
  success: false,
  error: {
    name: [],
    email: [],
    password: [],
    rePassword: [],
    phone: [],
  },
  message: null,
};
