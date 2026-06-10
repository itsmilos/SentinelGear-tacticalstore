"use client"

import { useState, useEffect } from "react";
import Card from "./Card";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])

    return (
        <div>
            <h1>Products Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 p-10">
                    {products.map((product) => (
                        <Card key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} />
                    ))}
                </div>
            )}
        </div>
    )
}