"use client"
import { Button, ProductCard } from '@/components'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { IProduct } from '@/interfaces'
import { apiServices } from '@/services/api'
import { ProductsResponse } from '@/types'
import { Grid, List } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  async function fetchProducts(){
    // const data: ProductsResponse = await apiServices.getAllProducts()
    // setLoading(false)
    // setProducts(data.data);
    try { // ADDED: Error handling with try-catch
      setLoading(true)
      const data: ProductsResponse = await apiServices.getAllProducts()
      setProducts(data.data)
      setError(null) // ADDED: Clear errors on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products') // ADDED: Proper error message
      console.error('Error fetching products:', err) // ADDED: Error logging
    } finally {
      setLoading(false) // ADDED: Ensure loading stops even if error occurs
    }
    
  }

  useEffect(() =>{
    fetchProducts();
  },[])

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'> 
        <div className='flex justify-center items-center min-h-[400px]'>
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if(error){
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>{error}</p>
          <Button onClick={fetchProducts}>Try Again</Button>
        </div>
      </div>
    )
  }
  return(
    <>
      <div className='container mx-auto px-4 py-8'>
        {/* header */}
        <div>
          <h1 className='text-3xl font-bold mb-2'>Products</h1>
          <p className='text-muted-foreground'>Discover Amazing Products From Our Collection</p>
        </div>
      </div>
      {/* grid btn */}
      <div className='flex items-center justify-end mb-5'>
        <div className='flex items-center border rounded-md'>
            <Button variant={viewMode === 'grid'?'default':'ghost'} 
            size={'sm'} onClick={()=> setViewMode("grid")}
            className='rounded-r-none px-3'>
            <Grid className='h-4 w-4'/>
            </Button>
      {/* list btn */}
            <Button variant={viewMode === 'list'?'default':'ghost'} 
            size={'sm'} onClick={()=> setViewMode("list")}
            className='rounded-l-none px-3'>
            <List className='h-4 w-4'/>
            </Button>
        </div>
      </div>

      {/* products */}
      {products.length > 0 ? ( // ADDED: Conditional rendering for empty state
        <div className={`grid gap-10 px-12 mb-8 ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              viewMode={viewMode} 
            />
          ))}
        </div>
        ) : (
        <div className='text-center py-12'> {/* ADDED: Empty state */}
          <p className='text-muted-foreground'>No products found.</p>
        </div>
      )}
    </>
  )
}
