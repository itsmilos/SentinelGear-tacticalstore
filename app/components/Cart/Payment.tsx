"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StripeProvider } from "./StripeProvider";
import PaymentForm from "./PaymentForm";

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [order, setOrder] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        const load = async () => {
            setLoading(true);

            const orderRes = await fetch(`/api/orders/${orderId}`);
            const orderData = await orderRes.json();
            setOrder(orderData.order);

            const intentRes = await fetch("/api/checkout/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const intentData = await intentRes.json();
            setClientSecret(intentData.clientSecret);

            setLoading(false);
        };

        load();
    }, [orderId]);

    if (loading) return <p>Loading payment...</p>;
    if (!order || !clientSecret) return <p>Missing payment data</p>;

    return (
        <StripeProvider clientSecret={clientSecret}>
            <PaymentForm order={order} />
        </StripeProvider>
    );
}