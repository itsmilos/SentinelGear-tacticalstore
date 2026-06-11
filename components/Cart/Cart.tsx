"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice"

export default function Cart() {
    const items = useAppSelector((state) => state.cart.items);
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
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

    return (
        <>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <button onClick={handleClearCart}>Clear Cart</button>
                    {items.map((item) => (
                        <div key={item.id}>
                            <h1>{item.name}</h1>
                            <h2>${item.price}</h2>
                            <p>Qty: {item.quantity}</p>
                            <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)}>+</button>
                            <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)}>-</button>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <h1>Total: ${totalPrice.toFixed(2)}</h1>
                    <h1>Items: {totalQuantity}</h1>
                    <button onClick={() => {/* checkout */ }}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </>
    );
}