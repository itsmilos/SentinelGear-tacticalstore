import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const orderId = parseInt(id, 10);

    try {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
            },
            include: {
                items: true
            }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found." }, { status: 404 });
        }

        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch order." }, { status: 500 });
    }
}