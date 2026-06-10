import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthenticateUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { items } = await request.json();
        const user = await AuthenticateUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = user.id;
        const cartItems = items.map((item: { productId: number; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }));

        const total = items.reduce((sum: number, item: { quantity: number; price: number }) => sum + (item.quantity * item.price), 0);

        const order = await prisma.order.create({
            data: {
                userId,
                total,
                items: {
                    create: cartItems
                },
            }
        });

        return NextResponse.json({ message: "Order created successfully.", order }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
    }
}