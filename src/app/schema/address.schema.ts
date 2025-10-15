import { z } from "zod";

export const AddressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "cartId is required" }),

  details: z

    .string()
    .nonempty({ message: "Address is required" })
    .min(3, { message: "Address must be at least 3 characters long" }),

  city: z
    .string()
    .nonempty({ message: "City is required" })
    .min(3, { message: "City must be at least 3 characters long" }),

  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(/^(?:\+20|0)?1[0125]\d{8}$/, {
      message: "Please enter a valid Egyptian phone number",
    }),
    paymentMethod: z.enum(["cash", "card"],

    {  message:"payment method",}
     )
});

export type AddressFormType = z.infer<typeof AddressFormSchema>;
export const AddressformState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod:[],
  },
  message: null,
    callbackUrl: "",

};

export type AddressformStateType = {
  success: boolean;
  error: {
    cartId?: string[];

    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?:string[]
  };
  message: string | null;
  callbackUrl?: string
};
