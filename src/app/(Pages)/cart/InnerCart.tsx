"use client"
import { Button, Separator } from '@/components'
import CartProduct from '@/components/products/CartProduct'
import CartContextProvider, { cartContext } from '@/contexts/cartContext'
import { formatPrice } from '@/helpers/currency'
import { GetUserCartResponse } from '@/interfaces'
import { apiServices } from '@/services/api'
import { Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface InnerCartProps{
    cartData:GetUserCartResponse
}

export default function InnerCart({cartData}: InnerCartProps) {
    
    const [innerCartData, setInnerCartData] = useState<GetUserCartResponse>(cartData)

    const [isClearingCart, setIsClearingCart] = useState(false)

    const {setCartCount} = useContext(cartContext)

    useEffect(()=>{
        setCartCount!(innerCartData.numOfCartItems);
    },[innerCartData]);

    async function updateCart(){
        const newCartData = await apiServices.getUserCart()
        setInnerCartData(newCartData)
    }

    async function handleRemoveItem(
        productId:string,
        setIsRemovingProduct:(value: boolean)=>void){
        setIsRemovingProduct(true)
        const response = await apiServices.removeCartProduct(productId)
        console.log(response);
        toast.success("Product Removed Successfully",{
        style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#000',
        },
        position: "bottom-right",
        iconTheme: {
        primary: '#000',
        secondary: '#FFFAEE',
        }
        })
        setIsRemovingProduct(false)
        updateCart()

    }

    async function handleClearCart(){
        setIsClearingCart(true)
        const response = await apiServices.clearCart()
        setIsClearingCart(false)
        updateCart()        
    }

    async function handleUpdateProductCartCount(productId:string, count:number){
        const response = await apiServices.updateCartProductCount(productId,count)
        console.log(response);
        updateCart()
        
    }

    return (
    <>
    {/* Header */}
        <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        { innerCartData.numOfCartItems>0 && <p className="text-muted-foreground">
            {innerCartData.numOfCartItems} Item
            {innerCartData.numOfCartItems > 1 ? "s " : ""}
            In Your Cart </p>
        }
        </div>

    { innerCartData.numOfCartItems>0 ? (    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
            <div className="space-y-4">
            {innerCartData.data.products.map((item) => (
                <CartProduct item={item}
                handleRemoveItem={handleRemoveItem}
                handleUpdateProductCartCount={handleUpdateProductCartCount} />))}
            </div>

          {/* Clear Cart */}
            <div className="mt-6">
            <Button variant="outline"
            disabled={isClearingCart}
            onClick={handleClearCart}>
            {isClearingCart? <Loader2 className='animate-spin mr-2'/> : <Trash2 className="h-4 w-4 mr-2" />}
                Clear Cart
            </Button>
            </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                <span>Subtotal ({innerCartData.numOfCartItems} items)</span>
                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
            </div>

            <Button className="w-full" size="lg">
                Proceed to Checkout
            </Button>

            <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/products">Continue Shopping</Link>
            </Button>
            </div>
        </div>
        </div> ) : (
            <div className='text-center'>
                <h2 className="text-xl semi-bold text-gray-700 mb-4">No Products In Your Cart</h2>
                <Button variant="outline" className="w-fit mt-2" asChild>
                <Link href="/products">Add Ones</Link>
            </Button>
            </div>
        )}
    </>
  )
}
