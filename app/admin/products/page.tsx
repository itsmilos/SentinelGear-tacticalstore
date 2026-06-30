"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Pencil, Trash2, ArrowLeft } from "lucide-react"

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: any;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('/api/products');
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setProducts(data.products);
            setLoading(false);
        }
        fetchProducts();
    }, [])

    async function handleDelete(productId: number) {
        const res = await fetch(`/api/admin/products/${productId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!res.ok) {
            throw new Error('Failed to delete product');
        }

        setProducts(prev => prev.filter(p => p.id !== productId));
    }

    return (
        <div className="min-h-screen text-white px-6 md:px-10 pt-16 pb-20 max-w-6xl mx-auto">

            <div className="flex items-baseline justify-between border-b border-[#353535] pb-6">
                <div>
                    <div className="pt-8">
                        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition tracking-widest">
                            <ArrowLeft size={18} />
                            COMMAND CENTER
                        </Link>
                    </div>
                    <h1 className="font-display text-5xl md:text-6xl mt-2">Inventory</h1>
                </div>
                <Link
                    href="/admin/products/new"
                    className="border border-[#353535] hover:border-white px-5 py-2 text-sm tracking-widest uppercase transition"
                >
                    + Add Product
                </Link>
            </div>

            {loading ? (
                <p className="text-center font-display text-3xl mt-20">Loading...</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500 mt-20 tracking-widest uppercase text-sm">No products yet</p>
            ) : (
                <div className="mt-10 border-t border-l border-[#353535]">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="grid grid-cols-2 md:grid-cols-5 gap-4 border-r border-b border-[#353535] p-5 items-center"
                        >
                            <div className="col-span-2 md:col-span-2">
                                <p className="text-xs tracking-widest text-gray-500 uppercase">Name</p>
                                <p className="font-display text-xl mt-1">{product.name}</p>
                            </div>

                            <div>
                                <p className="text-xs tracking-widest text-gray-500 uppercase">Price</p>
                                <p className="mt-1">${product.price.toFixed(2)}</p>
                            </div>

                            <div>
                                <p className="text-xs tracking-widest text-gray-500 uppercase">Stock</p>
                                <p className={`text-sm mt-1 ${product.stock === 0 ? 'text-red-400' : ''}`}>
                                    {product.stock}
                                </p>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <Link
                                    href={`/admin/products/${product.id}/edit`}
                                    className="p-2 border border-[#353535] hover:border-white transition"
                                >
                                    <Pencil size={16} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 border border-[#353535] hover:border-red-500 hover:text-red-500 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}