"use server";
import { getUserToken } from "@/lib/server-utils";

export async function getUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
      {
        headers: {
          token: token as string,
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "fetching  cart failed ",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "fetching  cart Successfully ",
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
export async function removeUserCard() {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "ٌRemoving from cart failed ",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "Removing from cart Successfully ",
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

export async function AddToCart(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      return {
        data: null,
        success: false,
        message: "Please login first",
      };
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ productId }),
      }
    );
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "adding to cart failed ",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "adding to cart Successfully ",
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

export async function removeFromCart(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Removing to cart failed ",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "Removing to cart Successfully ",
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

export async function UpdateQuantityProductCart(
  productId: string,
  count: number
) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ count }),
      }
    );
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "updation qty to cart failed ",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "updating qty to cart Successfully ",
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
