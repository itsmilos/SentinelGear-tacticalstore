"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "@/app/components/Cart/Payment";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        const run = async () => {
            setLoading(true);

            const res = await fetch("/api/checkout/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();

            console.log("PAYMENT INTENT RESPONSE:", data);

            setClientSecret(data.clientSecret);
            setLoading(false);
        };

        run();
    }, [orderId]);

    if (loading) return <p>Loading payment...</p>;
    if (!clientSecret) return <p>Missing client secret</p>;

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Payment />
        </Elements>
    );
}