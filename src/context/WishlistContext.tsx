"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { IWishlistProduct } from "@/interface/wishlist.interface";

interface IWishlistContext {
  Wishlist: IWishlistProduct[];
  setWishlist: React.Dispatch<React.SetStateAction<IWishlistProduct[]>>;
  GetWishlist: () => Promise<void>;
}

const WishlistContext = createContext<IWishlistContext | null>(null);

export function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [Wishlist, setWishlist] = useState<IWishlistProduct[]>([]);
  const { data: session } = useSession();

  const GetWishlist = useCallback(async () => {
    if (!session?.user?.token) return;

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "GET",
        headers: {
          token: session.user.token,
        },
        cache: "no-cache", // عشان دايمًا يجيب أحدث داتا
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setWishlist(data.data);
      } else {
        console.error("❌ Error fetching wishlist:", data.message);
      }
    } catch (error) {
      console.error("❌ Wishlist fetch failed:", error);
    }
  }, [session?.user?.token]);

  useEffect(() => {
    if (session?.user?.token) {
      GetWishlist();
    }
  }, [session?.user?.token, GetWishlist]);

  return (
    <WishlistContext.Provider value={{ Wishlist, setWishlist, GetWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistContextProvider");
  }
  return context;
}
