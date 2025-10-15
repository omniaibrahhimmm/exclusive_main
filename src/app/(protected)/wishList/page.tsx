"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "@/component/products/ProductItem";
import SectionTitle from "@/component/shared/SectionTitle";
import { getUserWishList, removeFromWishList,  } from "@/services/wishlist.service";
import { IProduct } from "@/interface/product.interface";

export default function WishlistPage() {
const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب الـ wishlist
  useEffect(() => {
    async function fetchWishlist() {
      setLoading(true);
      try {
        const res = await getUserWishList();
        if (res.success && res.data?.data) {
          setWishlist(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
      setLoading(false);
    }
    fetchWishlist();
  }, []);

  // حذف منتج من wishlist
  const handleDelete = async (id: string) => {
    try {
      const res = await removeFromWishList(id);
      if (res.success) {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.error("Failed to delete item:", res.message);
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <section className="container">
      <SectionTitle title="My Wishlist" subTitle="Your favorite products" />

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Your wishlist is empty 💔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mb-16">
          {wishlist.map((product) =>
            product?._id ? (
              <ProductItem
                key={product._id}
                product={product}
                showWishlistBtn={false} // نخفي زر الـ heart
                showDeleteBtn={true}    // نظهر زر الـ delete
                onDelete={handleDelete}  // نربط الحذف
              />
            ) : null
          )}
        </div>
      )}
    </section>
  );
}
