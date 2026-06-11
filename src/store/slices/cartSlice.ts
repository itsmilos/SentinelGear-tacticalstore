import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string | null;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
    isOpen: boolean;
    currentStep: 'cart' | 'checkout' | 'payment'
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        isOpen: false,
        currentStep: 'cart'
    } as CartState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload as CartItem;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += item.quantity;
                state.totalQuantity += item.quantity;
                state.totalPrice += item.price * item.quantity;
            } else {
                state.items.push(item);
                state.totalQuantity += item.quantity;
                state.totalPrice += item.price * item.quantity;
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload as number;
            const existingItemIndex = state.items.findIndex(i => i.id === itemId);

            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items.splice(existingItemIndex, 1);
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload as { id: number; quantity: number };
            const existingItem = state.items.find(i => i.id === id);

            if (existingItem) {
                state.totalQuantity += quantity - existingItem.quantity;
                state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;
                existingItem.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        setStep: (state, action) => {
            state.currentStep = action.payload;
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setStep, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;