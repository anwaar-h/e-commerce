import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    // async function getAllProducts() {
    //   const response = await fetch(
    //     "https://ecommerce.routemisr.com/api/v1/products")
    //     .then(res => res.json())
    //   return response.data;
    // }

    // const products : IProduct[] = await getAllProducts();    

  return (
    <div className="container mx-auto px-4 py-40">
      <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">Welcome To E-mart</h1>  
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Discover The Latest Technology, Fashion and Lifestyle Products.
        Quality Guaranteed With Fast Shipping and Excellent Customer Service.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="text-lg px-8" size={"lg"}>
          <Link href={"/products"}>Shop Now</Link>
        </Button>
        <Button className="text-lg px-8" size={"lg"} variant={"outline"}>
          <Link href={"/categories"}>Browse Categories</Link>
        </Button>
      </div>
      </div>
    </div>
  );
}