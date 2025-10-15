"use server";
import {
  AddressFormSchema,
  AddressformStateType,
} from "@/app/schema/address.schema";
import { getUserId, getUserToken } from "@/lib/server-utils";

export async function handlePayment(
  formState: AddressformStateType,
  formData: FormData
): Promise<AddressformStateType> {
  const ShippingAddress = {
    details: formData.get("details"),
    city: formData.get("city"),
    phone: formData.get("phone"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod");
  console.log("formData", cartId, ShippingAddress);

  const parsedData = AddressFormSchema.safeParse({
    ...ShippingAddress,
    cartId,
    paymentMethod,
  });

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
      callbackUrl: "/cart",
    };
  }
  try {
    const token = await getUserToken();
    const ApiUrl =
      paymentMethod === "cash"
        ? `api/v1/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${ApiUrl}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ ShippingAddress }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "adding to cart failed ",
        callbackUrl: "/cart",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "adding to cart Successfully ",
      callbackUrl: paymentMethod === "cash" ? "/allOrders" : data.session.url,
    };
  } catch (error) {
    return {
      error: {},
      success: false,
      message: (error as string) || "Something went Wrong",
    };
  }
}

export async function getUserOrders() {
  try {
    const userId = await getUserId();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "fetching  Orders failed ",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "fetching  Orders Successfully ",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went Wrong",
    };
  }
}
