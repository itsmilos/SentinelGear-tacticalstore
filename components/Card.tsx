"use client"

import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

interface Props {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null
}

export default function Card({ id, name, description, price, image }: Props) {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id,
            name,
            price,
            image: image || "",
            quantity: 1
        }));
    }

    return (
        <div className="bg-neutral-primary-soft rounded-base shadow-xs overflow-hidden transition hover:shadow-md rounded-2xl">
            <Image className="h-48 bg-gray-500" src={image || "/placeholder.webp"} alt="image" width="400" height="10" />
            <div className="p-6 flex flex-col h-full">
                <h5 className="mt-4 text-xl font-semibold text-heading">
                    {name}
                </h5>

                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">
                        ${price}
                    </span>

                    <button onClick={handleAddToCart} className="px-4 py-2 bg-green-900 text-green-300 hover:bg-green-700 rounded drop-shadow-2xl drop-shadow-green-900/50 transition">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}