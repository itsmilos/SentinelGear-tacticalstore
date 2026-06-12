"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart } from "@/store/slices/cartSlice";

export default function Navbar() {
    const dispatch = useAppDispatch();
    const totalQuantity = useAppSelector(state => state.cart.totalQuantity);

    return (
        <nav className="flex justify-between p-4">
            <h1>Tactical Store</h1>
            <button onClick={() => dispatch(openCart())}>
                Cart ({totalQuantity})
            </button>
        </nav>
    );
}