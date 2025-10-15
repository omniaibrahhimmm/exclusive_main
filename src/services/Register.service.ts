"use server";

import { FormState, RegisterFormSchema } from "@/app/schema/register.schema";

export async function HandleRegister(formState: FormState, formData: FormData): Promise <FormState> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };

  const parsedData = RegisterFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
    };
  }

  console.log("HandleRegister", parsedData);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        cache: "no-cache", // كويس هنا عشان ميكاش
      }
    );

    const data = await res.json();
    console.log("Signup response:", data);

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message,
      };
    }

    return {
      success: true,
      error: {},
      message: data.message,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      error:{},
      success: false,
      message: (error as string) || "Something went Wrong",
    };
  }
}
