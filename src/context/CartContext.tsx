import { ICartResponse } from "@/interface/cart.interface";
import { getUserCart } from "@/services/cart.service";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  CartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  GetCartDetails: () => Promise<void>;
}
const CartContext = createContext<ICartContext | null>(null);
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [CartDetails, setCartDetails] = useState<ICartResponse | null>(null);
  async function GetCartDetails() {
    const { data }: { data: ICartResponse } = await getUserCart();

    setCartDetails(data);
  }
  useEffect(() => {
    GetCartDetails();
  }, []);

  return (
    <CartContext.Provider
      value={{ CartDetails, setCartDetails, GetCartDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
