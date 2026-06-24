"use client"

import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { useState } from "react";
import { ShoppingCart, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
    product: any
}

export default function ProductDetails({ product }: Props) {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);

    const specs = product.specs as Record<string, string>;

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image ?? "",
            quantity
        }));
    }

    const decrement = () => setQuantity(q => Math.max(1, q - 1));
    const increment = () => setQuantity(q => q + 1);

    return (
        <>
            <div className="flex-1 max-w-3xl px-10">
                <div className="mb-10">
                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition tracking-widest"
                        >
                            <ArrowLeft size={18} />
                            BACK TO SHOP
                        </Link>
                    </div>
                </div>
            </div>

            <div className="pt-16 px-4 pb-10 md:px-10 flex flex-col md:flex-row gap-8 text-white">
                <div className="w-full md:w-[600px]">
                    <div className="w-full aspect-square md:aspect-[4/5] bg-gray-400 rounded-lg" />
                </div>

                <div className="flex flex-col w-full md:w-[500px]">

                    <div className="flex items-center justify-between">
                        <p className="text-[10px] md:text-xs tracking-widest uppercase text-gray-400">
                            {product.category?.name ?? product.category}
                        </p>

                        {product.stock !== undefined && (
                            <div className="flex items-center gap-1 text-[10px] md:text-xs tracking-widest uppercase text-gray-400">
                                <Package size={14} />
                                {product.stock} IN STOCK
                            </div>
                        )}
                    </div>

                    <h1 className="font-display text-2xl md:text-5xl mt-3 leading-tight">
                        {product.name}
                    </h1>
                    <h2 className="text-xl md:text-2xl mt-2">
                        ${product.price}
                    </h2>
                    <p className="text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-6">
                        Quantity
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <button onClick={decrement} className="w-9 h-9 md:w-10 md:h-10 border border-gray-600 flex items-center justify-center hover:bg-[#353535] transition">-</button>
                        <span className="w-10 text-center">{quantity}</span>
                        <button onClick={increment} className="w-9 h-9 md:w-10 md:h-10 border border-gray-600 flex items-center justify-center hover:bg-[#353535] transition">+</button>
                    </div>

                    <p className="text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-8">
                        Description
                    </p>
                    <p className="mt-2 text-sm md:text-base text-gray-200 leading-relaxed">
                        {product.description}
                    </p>

                    <p className="text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-8">
                        Specs
                    </p>
                    <div className="mt-2">
                        {Object.entries(specs || {}).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex justify-between py-2 border-b border-gray-700 text-sm md:text-base"
                            >
                                <span className="text-gray-400">{key}</span>
                                <span>{String(value)}</span>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleAddToCart} className="font-display text-2xl mt-10 w-full bg-green-300 text-black py-4 flex items-center justify-center gap-2 hover:bg-green-200 transition font-medium md:mt-33">
                        <ShoppingCart size={20} />
                        Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </button>

                </div>
            </div>
        </>
    );
}