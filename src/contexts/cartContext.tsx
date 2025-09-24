"use client"
import { apiServices } from "@/services/api";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType ={
    cartCount?: number;
    setCartCount?: React.Dispatch<React.SetStateAction<number>>;
    isLoading?: boolean
    handleAddToCart?: (productId:string, setAddToCartLoading:any)=> Promise<void>,
}

export const cartContext = createContext<CartContextType>({})


export default function CartContextProvider({
    children,
}:{
    children: ReactNode;
}){
    const [cartCount, setCartCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isAddToCartLoading, setIsAddToCartLoading] = useState(false)

    async function getCart(){
        setIsLoading(true)
        const response = await apiServices.getUserCart()
        setCartCount(response.numOfCartItems)
        setIsLoading(false)
    }

    useEffect(()=>{
        getCart()
    },[])

    async function handleAddToCart(productId:string, setAddToCartLoading:any) {
    setAddToCartLoading(true);
    const data = await apiServices.addProductToCart(productId);
    setCartCount(data.numOfCartItems)
    toast.success(data.message,{
        style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#000',
        },
        iconTheme: {
        primary: '#000',
        secondary: '#FFFAEE',
        }
        });
    setAddToCartLoading(false);
    }
    
    return <cartContext.Provider value={{cartCount, setCartCount, isLoading, handleAddToCart}}>
        {children}</cartContext.Provider>
}
