"use client";

import { Button } from "@/components/ui/button";
import { addToWishList } from "@/services/wishlist.service";
import { Heart } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import { IWishlistProduct } from "@/interface/wishlist.interface";

export default function AddToWishlistBtn({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const { Wishlist, setWishlist } = useWishlist();

  async function handleAdd() {
    startTransition(async () => {
      try {
        const res = await addToWishList(productId);

        if (res.success && res.data) {
          // تحديث الـ context بالمنتج الكامل
          setWishlist([...Wishlist, res.data as IWishlistProduct]);

          toast.success(res.message, { position: "top-center" });
        } else {
          toast.error(res.message, { position: "top-center" });
        }
      } catch (error) {
        toast.error(error as string | "Something went wrong", { position: "top-center" });
      }
    });
  }

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={handleAdd}
      className="cursor-pointer"
    >
      <Heart className={isPending ? "animate-pulse text-red-500" : ""} />
    </Button>
  );
}
