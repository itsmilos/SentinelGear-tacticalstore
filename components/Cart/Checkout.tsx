"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setStep } from "@/store/slices/cartSlice"

export default function Checkout() {
    const items = useAppSelector(state => state.cart.items);
    const totalPrice = useAppSelector(state => state.cart.totalPrice);
    const dispatch = useAppDispatch();

    return (
        <div>
            {items.map((item) => (
                <div>
                    <div key={item.id}>
                        <h1>{item.name}</h1>
                        <h2>${item.price}</h2>
                    </div>
                    <span>
                        <h1>{totalPrice}</h1>
                    </span>
                    <button onClick={() => dispatch(setStep('payment'))}>Contiune to Payment</button>
                    <button onClick={() => dispatch(setStep('cart'))}>Back to Cart</button>
                </div>
            ))}
        </div>
    )
}