
"use server"

export async function getCategory() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`,
      {
        cache: "no-cache",
        next:{ tags:['products'] }
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch categories");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error as string };
  }
}
