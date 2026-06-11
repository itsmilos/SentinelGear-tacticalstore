'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import CartModal from '@/components/Cart/CartModal';
import Navbar from "@/components/Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Navbar />
            <CartModal />
            {children}
        </Provider>
    );
}