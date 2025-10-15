export interface IUserOrderProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

export interface IOrder {
  _id: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  totalOrderPrice?: number;
  cartItems?: IUserOrderProduct[];
  createdAt?: string;
}
