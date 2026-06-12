import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000"
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p>{errorMessage}</p>}
            <CardElement />
            <button disabled={!stripe}>Pay Now</button>
        </form>
    )
} 