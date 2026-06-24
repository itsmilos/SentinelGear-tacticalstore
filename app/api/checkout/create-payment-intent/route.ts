import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: "Stripe key not configured" },
                { status: 500 }
            );
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json(
                { error: "Missing orderId" },
                { status: 400 }
            );
        }

        const order = await prisma.order.findFirst({
            where: {
                id: Number(orderId),
            },
        });

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.total * 100),
            currency: "eur",
            metadata: {
                orderId: String(order.id),
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error("Stripe error:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}