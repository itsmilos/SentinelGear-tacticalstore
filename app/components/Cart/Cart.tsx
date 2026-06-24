"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity, clearCart, closeSideBar } from "@/store/slices/cartSlice"
import { redirect } from "next/navigation";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function Cart() {
    const items = useAppSelector((state) => state.cart.items);
    const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

    const dispatch = useAppDispatch();

    const handleUpdateQty = (id: number, newQty: number) => {
        if (newQty <= 0) return;
        dispatch(updateQuantity({ id, quantity: newQty }));
    }

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart(id));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const goToCheckout = () => {
        dispatch(closeSideBar());
        redirect('/checkout')
    }

    return (
        <>
            {items.length === 0 ? (
                <p className="mt-5 text-center font-display text-3xl">Your cart is empty</p>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between bg-[#131313] border border-[#353535] p-5 mt-3">
                                <div className="flex gap-4">
                                    <div className="w-24 aspect-square relative">
                                        <Image src={item.image || "/placeholder.webp"} alt="image" fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="font-display text-2xl">{item.name}</h1>

                                        <div className="flex gap-3 mt-6 items-center">
                                            <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)} className="w-9 h-9 md:w-10 md:h-10 border border-gray-600 flex items-center justify-center hover:bg-[#353535] transition">-</button>
                                            <span className="w-10 text-center">{item.quantity}</span>
                                            <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)} className="w-9 h-9 md:w-10 md:h-10 border border-gray-600 flex items-center justify-center hover:bg-[#353535] transition">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end">
                                    <h2 className="font-display text-3xl">${item.price}</h2>
                                    <button onClick={() => handleRemoveFromCart(item.id)}>
                                        <Trash2 className="text-gray-500 hover:text-red-500" size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button className="mt-5 text-sm text-gray-500 hover:text-red-500" onClick={handleClearCart}>CLEAR ALL</button>
                    </div>

                    <div className="border-t border-[#353535] p-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm text-gray-500">TOTAL AMOUNT</h1>
                            <span className="text-white text-5xl font-display">
                                ${subTotal.toFixed(2)}
                            </span>
                        </div>
                        <button
                            className="mt-6 w-full bg-white text-black py-4 flex items-center justify-center gap-2 hover:bg-green-200 transition font-display text-2xl"
                            onClick={goToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                        <p className="text-center text-xs mt-5 text-gray-500 tracking-widest">SECURE PAYMENT * WORLDWIDESHIPPING</p>
                    </div>
                </div>
            )}
        </>
    );
}