"use client"

import { useState, useEffect } from "react";
import Card from "./Card";
import { useSearchParams } from "next/navigation";
import CategoryFilterBar from "./CategoryFilterBar";
import SortDropdown from "./SortDropdown";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: any
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`/api/products?${searchParams.toString()}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }
        fetchProducts();
    }, [searchParams.toString()])

    return (
        <div className="pt-20 text-white">
            <h1 className="font-display text-2xl text-center">EXPLORE GEAR</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 px-4 sm:px-10 mt-6">
                        <CategoryFilterBar />
                        <SortDropdown />
                    </div>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-10">
                        {products.map((product) => (
                            <Card key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} image={product.image} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}