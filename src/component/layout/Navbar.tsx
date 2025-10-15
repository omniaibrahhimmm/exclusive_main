"use client";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext"; // ✅ استيراد الويشليست

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Links = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Categories", path: "/categories" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const {  status } = useSession();

  const { CartDetails } = useCart();
  const { Wishlist } = useWishlist(); // ✅ نجيب الويشليست من الcontext
  const WishlistDetails = { count: Wishlist.length }; // ✅ عدد المنتجات

  return (
    <section className="py-4">
      <div className="container mx-auto p-5">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                Exclusive
              </span>
            </Link>

            {/* Links */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                {Links.map((link, idx) => (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink
                      href={link.path}
                      className={`${navigationMenuTriggerStyle()} ${
                        pathname === link.path
                          ? "text-red-600"
                          : "text-foreground hover:bg-muted hover:text-accent-foreground"
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side */}
          <div className="flex gap-2">
            {status === "loading" ? (
              <span>loading..</span>
            ) : status === "unauthenticated" ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Wishlist */}
                <Link className="relative" href="/wishList">
                  {WishlistDetails && (
                    <Badge
                      className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      {WishlistDetails.count}
                    </Badge>
                  )}
                  <Heart className="size-8" />
                </Link>

                {/* Cart */}
                <Link className="relative" href="/cart">
                  {CartDetails && (
                    <Badge
                      className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      {CartDetails.numOfCartItems}
                    </Badge>
                  )}
                  <ShoppingCart className="size-8" />
                </Link>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <User className="size-8  cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/allOrders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className=" cursor-pointer"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter">
                Exclusive
              </span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      Exclusive
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* Links */}
                <div className="flex flex-col p-4">
                  <div className="flex flex-col gap-6">
                    {Links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.path}
                        className={`px-2 py-1 text-sm font-medium ${
                          pathname === link.path
                            ? "text-red-600"
                            : "text-foreground hover:text-red-600"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Auth Section */}
                <div className="flex flex-col gap-6 p-4">
                  <div className="flex flex-col gap-3">
                    {status === "loading" ? (
                      <span>loading..</span>
                    ) : status === "unauthenticated" ? (
                      <>
                        <Button asChild variant="outline" size="sm">
                          <Link href="/login">Sign in</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href="/register">Sign up</Link>
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center gap-4">
                        {/* Wishlist */}
                        <Link className="relative" href="/wishList">
                          {WishlistDetails && (
                            <Badge
                              className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant="destructive"
                            >
                              {WishlistDetails.count}
                            </Badge>
                          )}
                          <Heart className="size-8" />
                        </Link>

                        {/* Cart */}
                        <Link className="relative" href="/cart">
                          {CartDetails && (
                            <Badge
                              className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                              variant="destructive"
                            >
                              {CartDetails.numOfCartItems}
                            </Badge>
                          )}
                          <ShoppingCart className="size-8" />
                        </Link>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <User className="size-8" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => signOut({ callbackUrl: "/login" })}
                            >
                              Sign out
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

