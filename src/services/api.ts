import { AddToCartResponse,  GetUserCartResponse } from "@/interfaces";
import { ProductsResponse, SingleProductResponse } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/";
class ApiServices{
    #baseURL : string = ""

    constructor() {
    this.#baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";  
    }

    async getAllProducts(): Promise<ProductsResponse> {
        return await fetch(`${this.#baseURL}api/v1/products`,{
            next: {
                revalidate: 60
            }
        }).then(res => res.json())
    //     const response = await fetch(`${this.#baseURL}api/v1/products`);
    //     if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // return response.json();
    }

    async getProductDetails(productId: string): Promise<SingleProductResponse> {
        const response = await fetch(`${this.#baseURL}api/v1/products/${productId}`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    
    #getHeaders(){
        return {
            "Content-Type": "application/json",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDBhNjY4ZDYwNzI5YTkzNjc4ZDVjNSIsIm5hbWUiOiJBbndhYXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODUwNDU4MCwiZXhwIjoxNzY2MjgwNTgwfQ.O7T3RZITl56YoTEc8KhHOAlWLspyQ6LU-kO9jzN9LNc"
        }
    }

    async addProductToCart(productId:string): Promise<AddToCartResponse> {
        return await fetch(`${this.#baseURL}api/v1/cart`, {
            method: 'POST',
            body: JSON.stringify({
                productId
            }),
            headers:this.#getHeaders()
        }).then(res=> res.json())
    }

    async getUserCart(): Promise<GetUserCartResponse>{
        return await fetch(`${this.#baseURL}api/v1/cart`,{
            headers: this.#getHeaders()
        }) .then(res => res.json())
    }

    async removeCartProduct(productId: string):Promise<any>{
        return await fetch(`${this.#baseURL}api/v1/cart/${productId}`,{
            headers: this.#getHeaders(),
            method: "delete"
    }).then(res => res.json())
    }

    async clearCart():Promise<any>{
        return await fetch(`${this.#baseURL}api/v1/cart`,{
            headers: this.#getHeaders(),
            method: "delete"
    }).then(res => res.json())
    }

    async updateCartProductCount(productId:string , count:number): Promise<any>{
        return await fetch(`${this.#baseURL}api/v1/cart/${productId}`,{
            method:"put",
            body: JSON.stringify({
                count
            }),
            headers: this.#getHeaders()
    }).then(res=>res.json())
}



}
export const apiServices = new ApiServices()