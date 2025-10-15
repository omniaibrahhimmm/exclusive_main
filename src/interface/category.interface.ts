import { IPagination } from "./pagination.interface";

// Response كامل من API
export interface ICategoryResponse {
  results: number;       // عدد الكاتيجوريز الكلي
  metadata: IPagination; // بيانات الصفحات (pagination)
  data: ICategory[];     // Array من الكاتيجوريز
}



export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
