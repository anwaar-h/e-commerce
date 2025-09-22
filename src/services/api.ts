import { ProductsResponse, SingleProductResponse } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com/";
class ApiServices{
    baseURL : string = ""
    constructor() {
    // Ensure the baseURL ends with a slash for proper concatenation
    this.baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";  
}

    async getAllProducts(): Promise<ProductsResponse> {
        const response = await fetch(`${this.baseURL}api/v1/products`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    }
    async getProductDetails(productId: string): Promise<SingleProductResponse> {
        const response = await fetch(`${this.baseURL}api/v1/products/${productId}`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}

export const apiServices = new ApiServices();