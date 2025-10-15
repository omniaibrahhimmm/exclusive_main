"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  removeFromCart,
  removeUserCard,
  UpdateQuantityProductCart,
} from "@/services/cart.service";

export default function CartPage() {
  const { CartDetails, setCartDetails } = useCart();
  async function RemoveCartItem() {
    const res = await removeUserCard();
    if (res?.message === "success") {
      toast.success("cart removed successfully");
      setCartDetails(null);
    } else {
      toast.error(res?.message || "something went wrong");
    }
  }

  async function RemoveProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    console.log(res.data);

    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, { position: "top-center" });
    }
  }

  async function UpdateQuantityProduct(productId: string, count: number) {
    const res = await UpdateQuantityProductCart(productId, count);
    console.log(res.data);

    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, { position: "top-center" });
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        {CartDetails && CartDetails.data.products.length > 0 ? (
          <>
            <section className="mb-20">
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CartDetails.data.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-5 relative">
                          <Badge
                            onClick={() =>
                              RemoveProductFromCart(product.product._id)
                            }
                            className=" absolute -top-0.5 -start-0.5 h-5 min-w-5 rounded-full px-1 font-mono cursor-pointer tabular-nums"
                            variant="destructive"
                          >
                            <X />
                          </Badge>
                          <Image
                            src={product.product.imageCover}
                            alt={product.product.title}
                            width={54}
                            height={54}
                          />
                          <h2>{product.product.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            onClick={() =>
                              UpdateQuantityProduct(
                                product.product._id,
                                product.count - 1
                              )
                            }
                          >
                            -
                          </Button>
                          {product.count}
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            onClick={() =>
                              UpdateQuantityProduct(
                                product.product._id,
                                product.count + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.count * product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between">
                <Button variant={"outline"} asChild>
                  <Link href="/products">Return to shop</Link>
                </Button>
                <Button variant={"destructive"} onClick={RemoveCartItem}>
                  Remove All
                </Button>
              </div>
            </section>
            <section className="flex  justify-between">
              <div className="flex  items-center gap-4 w-5/12">
                <Input placeholder="coupoun code" />
                <Button variant="destructive"> Apply Coupon</Button>
              </div>

              <div className=" w-5/12 py-8 px-6 border border-gray-950">
                <h3 className="  font-bold mb-6 text-xl">Cart Total</h3>
                <ul className=" divide-y divide-gray-950">
                  <li className=" py-6 flex justify-between">
                    <span> Subtotal:</span>
                    <span>{CartDetails.data.totalCartPrice}</span>
                  </li>
                  <li className=" py-6 flex justify-between">
                    <span> Shipping:</span>
                    <span>Free</span>
                  </li>
                  <li className=" py-6 flex justify-between">
                    <span> Total:</span>
                    <span>{CartDetails.data.totalCartPrice}</span>
                  </li>
                </ul>
                <div className="flex  justify-center">
                  <Button variant="destructive" asChild className=" cursor-pointer">
                    <Link href="/checkout"> Proceed to checkout</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold "> Your cart is empty</h2>
            <Button variant={"outline"} asChild>
              <Link href="/products">Return to shop</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
