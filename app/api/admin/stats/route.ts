import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthenticateUser } from "@/lib/auth";

export async function GET() {
    const user = await AuthenticateUser();
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.order.count();
    const pendingOrders = await prisma.order.count({
        where: {
            status: 'PENDING'
        }
    })
    const totalRevenue = await prisma.order.aggregate({ _sum: { total: true } });

    return NextResponse.json({ totalOrders, totalProducts, pendingOrders, totalRevenue: totalRevenue._sum.total || 0 });
}