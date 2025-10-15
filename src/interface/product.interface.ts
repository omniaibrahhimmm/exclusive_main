import { IPagination } from "./pagination.interface"
import { ISubcateg } from "./subCategory.interface"
import { ICategory } from './category.interface';
import { IBrand } from "./brand.interface";

export interface IProductResponse {
  results: number
  metadata: IPagination
  data: IProduct[]
}


export interface IProduct {
  sold?: number
  images: string[]
  subcategory: ISubcateg[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}

