"use client";
export const dynamic = "force-dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AddressFormSchema,
  AddressformState,
  AddressFormType,
} from "@/app/schema/address.schema";
import { handlePayment } from "@/services/order.service";
import { useActionState, useTransition, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoaderCircle } from "lucide-react";

export default function CheckoutPage() {
  const { CartDetails, setCartDetails } = useCart();
  const [action, formAction] = useActionState(handlePayment, AddressformState);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<AddressFormType>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    if (CartDetails) {
      form.setValue("cartId", CartDetails.cartId);
    }
  }, [CartDetails, form]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {
        if (form.getValues("paymentMethod") === "cash") {
          toast.success(action.message, { position: "top-center" });
          setCartDetails(null);

          timeout = setTimeout(() => {
            router.push(action.callbackUrl || "/allOrders");
          }, 2000);
        } else {
          window.location.href = action.callbackUrl as string;
        }
      } else if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [action, router, setCartDetails, form]);

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center font-bold mb-8">Address Details</h1>
        <Form {...form}>
          <form
            className="space-y-8"
            action={(formData) => startTransition(() => formAction(formData))}
          >
            {/* hidden cartId */}
            <FormField
              control={form.control}
              name="cartId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input
                      type="hidden"
                      {...field}
                      value={CartDetails?.cartId}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Address details */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details</FormLabel>
                  <FormControl>
                    <Input placeholder="Address Details" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.details?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.city?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01012345678"
                      {...field}
                      type="tel"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* Payment */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">Card</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
