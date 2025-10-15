"use client";

import Image from "next/image";
import { Stars, Trash2 } from "lucide-react";
import React from "react";
import { IProduct } from "@/interface/product.interface";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddtoCartBtn from "./AddtoCartBtn";
import AddToWishlistBtn from "../shared/AddToWishlistBtn";

interface ProductItemProps {
  product: IProduct;
  showWishlistBtn?: boolean; 
  showDeleteBtn?: boolean; //
  onDelete?: (id: string) => void;
}

export default function ProductItem({
  product,
  showWishlistBtn = true,
  showDeleteBtn = false,
  onDelete,
}: ProductItemProps) {
  if (!product) return null;

  return (
    <div className="relative">
      <picture className="relative group overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover || "/placeholder.png"}
            alt={product.title || "Product"}
            width={270}
            height={500}
            className="w-full h-[15.625rem] object-contain bg-gray-100 mb-4"
          />
        </Link>

        {/* Add to Cart Button يظهر عند hover */}
        <AddtoCartBtn
          productId={product._id}
          className="absolute bottom-0 w-full cursor-pointer translate-y-full group-hover:translate-y-0 invisible group-hover:visible"
        />

        {/* Heart Wishlist Button فوق الصورة */}
        {showWishlistBtn && (
          <div className="absolute top-2 right-2">
            <AddToWishlistBtn productId={product._id} />
          </div>
        )}

        {/* Delete Button يظهر فقط لو موجود */}
        {showDeleteBtn && onDelete && (
          <Button
            onClick={() => onDelete(product._id)}
            className="absolute top-2 left-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </picture>

      <h3 className="font-medium mb-4 line-clamp-1">
        <Link href={`/products/${product._id}`}>{product.title}</Link>
      </h3>

      <div className="flex items-center gap-x-4">
        <span className="font-medium text-red-500">{product.price} EGP</span>

        <div className="flex items-center gap-x-1">
          <Stars className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
      </div>
    </div>
  );
}
