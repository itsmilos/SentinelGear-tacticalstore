import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string | null;
}

type ShippingMethod = {
    id: string;
    label: string;
    price: number;
};

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    shippingMethods: ShippingMethod[];
    selectedShipping: ShippingMethod | null;
    clientSecret: string;
    isCartOpen: boolean
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    shippingMethods: [
        { id: "standard", label: "Standard Delivery (2–5 days)", price: 10 },
        { id: "express", label: "Express Delivery (1–2 days)", price: 20 },
        { id: "pickup", label: "Store Pickup", price: 0 }
    ],
    selectedShipping: {
        id: "standard",
        label: "Standard Delivery (2–5 days)",
        price: 10
    },
    clientSecret: "",
    isCartOpen: false
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload as CartItem;
            const existing = state.items.find(i => i.id === item.id);

            if (existing) {
                existing.quantity += item.quantity;
            } else {
                state.items.push(item);
            }

            state.totalQuantity += item.quantity;
        },

        removeFromCart: (state, action) => {
            const id = action.payload as number;
            const item = state.items.find(i => i.id === id);

            if (!item) return;

            state.totalQuantity -= item.quantity;
            state.items = state.items.filter(i => i.id !== id);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i.id === id);

            if (!item) return;

            state.totalQuantity += quantity - item.quantity;
            item.quantity = quantity;
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.clientSecret = "";
            state.selectedShipping = state.shippingMethods[0];
        },

        setShippingMethod: (state, action) => {
            state.selectedShipping = action.payload;
        },

        setClientSecret: (state, action) => {
            state.clientSecret = action.payload;
        },
        openSideBar: (state) => {
            state.isCartOpen = true;
        },
        closeSideBar: (state) => {
            state.isCartOpen = false;
        },
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setShippingMethod, setClientSecret, openSideBar, closeSideBar } = cartSlice.actions;

export default cartSlice.reducer;