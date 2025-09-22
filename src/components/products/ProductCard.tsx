"use client"
import React from 'react'
import {IProduct} from '@/interfaces/Product'
import Link from 'next/link';
import { formatPrice } from '@/helpers/currency';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '../ui';
import { renderStars } from '@/helpers/rating';
import Image from 'next/image';

interface ProductCardProps {
    product: IProduct ;
    viewMode?: 'grid' | 'list' ;
}

export function ProductCard({product , viewMode = 'grid'} : ProductCardProps) {
    
    if(viewMode === 'list'){
        
        return ( 
        <div className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
            {/* image */}
            <div className="relative w-32 h-32 flex-shrink-0">
            <Image src={product.imageCover}
            alt={product.title} fill
            className="object-cover rounded-object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg" sizes="128px"/>
        </div>

    {/* product info */}
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-2">
                <Link href={`/products/${product.id}`}
                    className="hover:text-primary transition-colors">
                    {product.title}
                </Link>
                </h3>
            <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
            </Button>
            </div>
            {/* description */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
            </p>
        {/* rating and sold */}
        <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
                {renderStars(product.ratingsAverage)}
            <span className="text-sm text-muted-foreground ml-1">
                ({product.ratingsQuantity})
            </span>
            </div>
            <span className="text-sm text-muted-foreground">
                {product.sold} sold
            </span>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                {/* price */}
                <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
                </span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {/* brand */}
                <span>
                    Brand:{" "}
                    <Link href={``}
                    className="hover:text-primary hover:underline transition-colors">
                    {product.brand.name}
                    </Link>
                </span>
                {/* category */}
                <span>
                    Category:{" "}
                    <Link href={``}
                    className="hover:text-primary hover:underline transition-colors">
                    {product.category.name}
                    </Link>
                </span>
            </div>
            </div>
            {/* add to cart btn */}
            <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
            </Button>
        </div>
        </div>
    </div>
    );
    }

    return (
    <div className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* image */}
        <div className="h-full flex flex-col">
        <div className='relative aspect-square overflow-hidden h-full'>
            <Image
            src={product.imageCover} alt={product.title} fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* wishlist button */}
        <Button variant="ghost" size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white">
        <Heart className="h-4 w-4" />
        </Button>

        {/* badge sold */}
        {product.sold > 2000 && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                Popular
            </div>
        )}
        </div>

      {/* product info */}
        <div className="p-4">
        {/* brand */}
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
            <Link href={``}
            className="hover:text-primary hover:underline transition-colors">
            {product.brand.name}
            </Link>
        </p>

        {/* title */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-1 hover:text-primary transition-colors">
            <Link href={`/products/${product._id}`}>{product.title}</Link>
        </h3>

        {/* rating */}
        <div className="flex items-center gap-1 mb-2">
            <div className="flex">{renderStars(product.ratingsAverage)}</div>
                <span className="text-xs text-muted-foreground">
                ({product.ratingsQuantity})
                </span>
        </div>

        {/* category */}
        <p className="text-xs text-muted-foreground mb-2">
            <Link href={``}
            className="hover:text-primary hover:underline transition-colors">
            {product.category.name}
            </Link>
        </p>

        {/* price */}
        <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted-foreground">{product.sold} sold</span>
        </div>

        </div>

        <div className='p-3'>  
        {/* add to cart btn */}
        <Button className="w-full" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
        </Button>
        </div>
        </div>
    </div>
    );
    
}
