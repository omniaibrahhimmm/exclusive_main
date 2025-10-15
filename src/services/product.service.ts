"use server";
export async function getProducts(limit = 40, categoryId?: string) {
  try {
    const endPoint = categoryId
      ? `limit=${limit}&category[in]=${categoryId}`
      : `limit=${limit}`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?${endPoint}`
    );

    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${id}`
    );

    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
