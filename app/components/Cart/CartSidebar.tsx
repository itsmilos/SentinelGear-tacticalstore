"use client"

import { closeSideBar } from "@/store/slices/cartSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Cart from "./Cart";
import { X } from "lucide-react";

export default function CartSideBar() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(state => state.cart.isCartOpen);
    const totalQuantity = useAppSelector(state => state.cart.totalQuantity);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50">
                <div onClick={() => dispatch(closeSideBar())} className="absolute inset-0 bg-black/0.5 backdrop-blur-sm" />
                <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 h-full w-full sm:w-[500px] shadow-xl backdrop-blur bg-black/80 z-50 text-white border border-[#353535] flex flex-col">
                    <div className="flex items-center justify-between p-4 border-y border-[#353535]">
                        <div>
                            <h2 className="text-4xl font-display">Supply Cache</h2>
                            <p className="mt-2 text-sm text-gray-500">{totalQuantity} items</p>
                        </div>
                        <button onClick={() => dispatch(closeSideBar())} className="hover:text-red-500 transition">
                            <X size={25} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <Cart />
                    </div>
                </div>
            </div>
        </>
    )
}