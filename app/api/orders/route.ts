import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getShipping from "@/lib/shipping";

export async function POST(request: NextRequest) {
    try {
        const { items, customer, address } = await request.json();


        if (!items?.length) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        if (!customer?.email) {
            return NextResponse.json(
                { error: "Missing customer data" },
                { status: 400 }
            );
        }

        if (!address?.country) {
            return NextResponse.json(
                { error: "Missing address" },
                { status: 400 }
            );
        }

        const subtotal = items.reduce(
            (sum: number, item: any) =>
                sum + item.price * item.quantity,
            0
        );

        const shipping = getShipping(address.country);
        const total = subtotal + shipping;

        const cartItems = items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
        }));

        console.log("SHIPPING:", shipping);
        console.log("TOTAL BEFORE SAVE:", total);

        const order = await prisma.order.create({
            data: {
                total,
                status: "PENDING",
                customerName: `${customer.firstName} ${customer.lastName}`,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                shippingCountry: address.country,
                shippingStreet: address.street,
                shippingCity: address.city,
                shippingPostal: address.postalCode,

                items: {
                    create: cartItems,
                },
            },
        });

        console.log("FINAL ORDER TOTAL:", order.total);

        return NextResponse.json(
            {
                message: "Order created successfully",
                orderId: order.id,
                total,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("ORDER ERROR:", error);

        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : error
            },
            { status: 500 }
        );
    }
}