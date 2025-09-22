"use client"
import React, { useEffect, useState } from 'react'
import { IProduct } from '@/interfaces'
import { notFound, useParams } from 'next/navigation';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { SingleProductResponse } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { renderStars } from '@/helpers/rating';
import { formatPrice } from '@/helpers/currency';
import { Button } from '@/components';
import { Heart, RotateCcw, Shield, ShoppingCart, Truck } from 'lucide-react';
import { apiServices } from '@/services/api';


export default function ProductDetail() {

    const { id }= useParams()
    const [product, setProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState(0)
    
    async function FetchProductDetails() {
        // setLoading(true)
        // const data:SingleProductResponse = await apiServices.getProductDetails(String(id))
        // setProduct(data.data)
        // setLoading(false)
         try { // ADDED: Error handling with try-catch
            setLoading(true)
            const data: SingleProductResponse = await apiServices.getProductDetails(String(id))
            setProduct(data.data)
            setError(null) // ADDED: Clear any previous errors on success
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load product') // ADDED: Proper error message
            console.error('Error fetching product:', err) // ADDED: Error logging
        } finally {
            setLoading(false) // ADDED: Ensure loading stops even if error occurs
        }
    }
    useEffect(() => {
        FetchProductDetails()
    },[id])

    if(loading){
        return(
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center items-center min-h-[400px]'>
                    <LoadingSpinner/>
                </div>
            </div>
        )
    }

    if(error || !product){
        return(
            <div className='container mx-auto px-4 py-8'> {/* CHANGED: Added container and padding */}
                <div className='text-center'>
                    <p className='text-red-600 mb-4'>{error || 'Product not found'}</p>
                    <Button onClick={FetchProductDetails}>Try Again</Button> {/* ADDED: Retry functionality */}
                </div>
            </div>
        )
    }

    return(
        <div className='container mx-auto px-20 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5'>
                {/* product image */}
                <div className='space-y-4 pt-10 pb-10 pl-8'>
                    {/* main image */}
                    <div className='relative aspect-square overflow-hidden rounded-lg border'>
                        <Image src={product.images[selectedImage]?? product.imageCover} alt={product.title} fill 
                        className='object-cover'
                        sizes='(max-width:768px) 100vw , 50vw' priority/>
                    </div>
                    {/* thumbnail images */}
                    {product.images.length > 1 && (
                        <div className='flex justify-center gap-2 overflow-x-auto pb-2'>
                            {product.images.map((image,index)=>(
                                <button key={index}
                                onClick={()=> setSelectedImage(index)}
                                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 
                                ${ selectedImage === index ?
                                "border-primary ring-2 ring-primary/20" : "border-gray-200 hover:border-gray-300" }`}>
                                <Image src={image} alt={`${product.title} ${index + 1}`} 
                                fill className='object-cover' sizes='80px'/>
                                </button>
                            ))}
                        </div>
                    )}
                    </div>
                    {/* product info */}
                    <div className='space-y-6 p-9'>
                        {/* brand */}
                        <div className='text-sm text-muted-foreground font-bold uppercase tracking-wide'>
                            <Link href={''} className='hover:text-primary hover:underline transition-colors'>
                            {product.brand.name}
                            </Link>
                        </div>
                        {/* title */}
                        <h1 className='text-3xl font-bold tracking-tight'>{product.title}</h1>
                        {/* rating */}
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-1'>
                                {renderStars(product.ratingsAverage)}
                                <span className='ml-2 text-sm text-muted-foreground'>
                                    {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity} Reviews)
                                </span>
                            </div>
                        </div>
                        {/* price */}
                        <div className='text-3xl font-bold text-primary'>
                            {formatPrice(product.price)}
                        </div>
                        {/* description */}
                        <div className='space-y-2'>
                            <h3 className='font-semibold text-lg'>Description</h3>
                            <p className='text-muted-foreground leading-relaxed'>
                                {product.description}
                            </p>
                        </div>
                        {/* category */}
                        <div className='flex flex-wrap gap-2'>
                            <Link href={''}
                            className='px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-bold text-sm hover:bg-secondary/80 transition-colors'>
                                {product.category.name}
                            </Link>
                        </div>
                        {/* stock */}
                        <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium'>
                                Stock:
                            </span>
                            <span className={`text-sm font-medium ${
                            product.quantity > 0 ? "text-green-600" : "text-red-600"  
                            }`}>
                            { product.quantity > 0 ? `${product.quantity} Available` : "Out Of Stock"}
                            </span>
                        </div>
                        {/* cart&heart btns */}
                        <div className='flex gap-4 pt-4'>
                            <Button className='flex-1' size='lg'
                            disabled={product.quantity === 0}>
                            <ShoppingCart className='h-5 w-5 mr-2'/>
                            Add To Cart </Button>
                            <Button variant={"outline"} size={"lg"} className="px-4">
                                <Heart className='h-5 w-5'/>
                            </Button>
                        </div>
                        {/* features */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 py-6 border-t'>
                            <div className='flex items-center gap-3 p-2 bg-muted/50 rounded-lg'>
                                <Truck className='h-5 w-5 text-primary'/>
                                <div>
                                    <p className='font-medium text-sm'>Free Shipping</p>
                                    <p className='text-xs text-muted-foreground'>
                                        On Orders Over $100
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-2 bg-muted/50 rounded-lg'>
                                <Shield className='h-6 w-6 text-primary'/>
                                <div>
                                    <p className='font-medium text-sm'>Secure Payment</p>
                                    <p className='text-xs text-muted-foreground'>
                                        100% Secure Checkout
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-2 bg-muted/50 rounded-lg'>
                                <RotateCcw className='h-5 w-5 text-primary'/>
                                <div>
                                    <p className='font-medium text-sm'>Easy Returns</p>
                                    <p className='text-xs text-muted-foreground'>
                                        30-Day Return Policy
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
        </div>
    )
}
