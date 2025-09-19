import React from 'react'
import { IProduct } from '@/interfaces'
import { notFound } from 'next/navigation';

async function getProduct(productId: string) {
    try{
        const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products/${productId}`)  
            .then(res => res.json());
        return response.data;

    } catch (errors){
        notFound();
    }
}

export default async function ProductDetail({ params }: { params: { productId: string } }) {

    const product: IProduct = await getProduct(params.productId);
    
    return (

    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <img 
        src={product.imageCover} 
        className="w-full max-w-md h-auto object-cover mb-4" 
        alt={product.title} 
        />
        <p className="text-lg">{product.description}</p>
        <p className="text-2xl font-bold mt-4">${product.price}</p>
    </div>
    )
}
