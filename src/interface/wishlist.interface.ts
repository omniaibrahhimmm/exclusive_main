// src/interface/wishlist.interface.ts
export interface IWishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  
  category: {
    _id: string;
    name: string;
  };
  brand: {
    _id: string;
    name: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
}
