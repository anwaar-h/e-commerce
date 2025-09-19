import { ApiResponse, IBrand, ICategory, IProduct } from "@/interfaces";

export type ProductsResponse = ApiResponse<IProduct>
export type BrandsResponse = ApiResponse<IBrand>
export type CategoriesResponse = ApiResponse<ICategory>

export type SingleProductResponse = {
    data: IProduct 
}
export type SingleBrandResponse = {
    data: IBrand 
}
export type SingleCategoryResponse = {
    data: ICategory 
}
