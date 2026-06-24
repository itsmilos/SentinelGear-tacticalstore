import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );
    } catch (err) {
        return NextResponse.json(
            { error: "Invalid webhook signature" },
            { status: 400 }
        );
    }

    try {
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;

            const orderId = Number(paymentIntent.metadata.orderId);

            await prisma.order.update({
                where: { id: orderId },
                data: { status: "PAID" }
            });
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}