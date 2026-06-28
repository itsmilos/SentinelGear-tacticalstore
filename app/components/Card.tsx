"use client"

import Image from "next/image";
import Link from "next/link";

interface Props {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null
}

export default function Card({ id, name, description, price, image }: Props) {
    return (
        <Link href={`/products/${id}`} className="relative group bg-neutral-primary-soft rounded-base shadow-xs overflow-hidden transition-transform rounded-1xl border-[#353535] border hover:border-[#868686] w-full">
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none" />
            <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                    src={image || "/placeholder.webp"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-6 flex flex-col h-full">
                <h5 className="mt-4 text-xl font-semibold text-heading">{name}</h5>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">${price} </span>
                </div>
                <button className="relative overflow-hidden border border-[#353535] mt-10 h-10 hover:border-white group">
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative font-display tracking-widest">View Details</span>
                </button>
            </div>
        </Link>

    );
}