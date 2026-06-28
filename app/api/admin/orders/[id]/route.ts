import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthenticateUser } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await AuthenticateUser();
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const orderId = parseInt(id, 10);
    const { status } = await req.json();
    const order = await prisma.order.findUnique({
        where: { id: orderId },
    })
    if (!order) {
        return NextResponse.json({ message: 'Order not found.' });
    }
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status }
        })
        return NextResponse.json({ updatedOrder });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}