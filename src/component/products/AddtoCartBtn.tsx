"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { AddToCart } from "@/services/cart.service";
import { LoaderCircle } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

export default function AddtoCartBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const [isPending, startTransition] = useTransition(); // ✅ تعديل هنا
  const { GetCartDetails } = useCart();

  async function addProductToCart(productId: string) {
    startTransition(async () => {
      const res = await AddToCart(productId);
      console.log(res);
      if (res.success) {
        toast.success(res.message, { position: "top-center" });
        GetCartDetails();
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    });
  }

  return (
    <Button
      disabled={isPending}
      onClick={() => addProductToCart(productId)}
      {...props}
    >
      {isPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}
