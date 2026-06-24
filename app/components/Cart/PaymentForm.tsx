"use client"

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PaymentForm({ order }: any) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success?orderId=${order.id}`,
            },
        });

        if (error) setError(error.message ?? "Payment failed");
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 text-white">

            <div className="mb-10 pt-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition tracking-widest"
                >
                    <ArrowLeft size={18} />
                    BACK TO SHOP
                </Link>
            </div>

            <h1 className="text-5xl lg:text-7xl mb-10 font-display">
                Payment
            </h1>

            <div className="bg-[#181818] border border-[#353535] p-6 mb-8 flex justify-between items-start">

                <div>
                    <p className="text-xs text-gray-500 tracking-widest">
                        ORDER FOR
                    </p>
                    <h2 className="text-xl font-display">
                        {order.customerName}
                    </h2>
                </div>

                <div className="text-right">
                    <p className="text-xs text-gray-500 tracking-widest">
                        TOTAL
                    </p>
                    <p className="text-2xl font-display">
                        ${order.total}
                    </p>
                </div>

            </div>

            <p className="text-sm text-gray-500 tracking-widest mb-5">SELECT PAYMENT METHOD</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="bg-[#181818] border border-[#353535] p-6">
                    <PaymentElement />
                </div>

                <button
                    disabled={!stripe}
                    className="w-full bg-white text-black py-4 font-display text-2xl hover:bg-green-200 transition"
                >
                    Pay Now
                </button>

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

            </form>

        </div>
    );
}