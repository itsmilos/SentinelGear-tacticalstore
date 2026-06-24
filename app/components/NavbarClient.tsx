"use client";

interface Props {
    isLoggedIn: boolean
}

import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openSideBar } from "@/store/slices/cartSlice";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarClient({ isLoggedIn }: Props) {
    const dispatch = useAppDispatch();
    const totalQuantity = useAppSelector(state => state.cart.totalQuantity);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`text-white fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-black/40" : ""}`}>
            <Link href="/" className="font-display text-xl sm:text-2xl">
                SG
            </Link>

            <button onClick={() => dispatch(openSideBar())} className="relative">
                <div className="flex gap-1 items-center">
                    <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>

                {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-3 bg-green-200 text-[10px] sm:text-xs text-black px-1.5 sm:px-2 py-0.5 rounded-full animate-bounce font-display">
                        {totalQuantity}
                    </span>
                )}
            </button>
        </nav>
    );
}