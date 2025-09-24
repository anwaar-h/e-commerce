import React from 'react'
import InnerCart from './InnerCart';
import { apiServices } from '@/services/api';

export default async function Cart() {

    async function fetchCart(){
        const response = await apiServices.getUserCart()
        return response;
    }
    const response = await fetchCart()

    return (
    <div className="container mx-auto px-4 py-8">
        <InnerCart cartData={response} />
    </div>
    )
}
