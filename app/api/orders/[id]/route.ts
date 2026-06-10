import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthenticateUser } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await AuthenticateUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = user.id;
        const orderId = parseInt(params.id, 10);

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId: userId,
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