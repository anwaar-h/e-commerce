import { IBrand } from "./Brand";
import { ICategory } from "./Category";

export interface AddToCartResponse {
    status: string,
    message: string,
    numOfCartItems: number,
    cartId: string,
    data:CartResponseData<string>
}

export interface GetUserCartResponse {
    status: string,
    message: string,
    numOfCartItems: number,
    cartId: string,
    data:CartResponseData<InnerCartProduct> 
}

interface CartResponseData<T> {
    _id: string,
    cartOwner: string,
    products: CartProduct<T>[],
    createdAt: string,
    updatedAt: string,
    totalCartPrice: number
}

export interface CartProduct<T> {
    count: number,
    _id: string,
    product: T ,
    price: number
}

export interface InnerCartProduct {
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: ICategory;
    brand: IBrand;
    ratingsAverage: number;
    id: string;
}

