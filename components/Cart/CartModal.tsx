"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeCart } from "@/store/slices/cartSlice";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { current } from "@reduxjs/toolkit";
import Payment from "./Payment";

export default function CartModal() {
    const isOpen = useAppSelector(state => state.cart.isOpen);
    const currentStep = useAppSelector(state => state.cart.currentStep);
    const dispatch = useAppDispatch();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button
                        onClick={() => dispatch(closeCart())}
                        className="text-2xl"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    {currentStep === 'cart' && <Cart />}
                    {currentStep === 'checkout' && <Checkout />}
                    {currentStep === 'payment' && <Payment />}
                </div>
            </div>
        </div>
    )
}