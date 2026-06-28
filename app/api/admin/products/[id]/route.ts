import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthenticateUser } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await AuthenticateUser();
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        const updated = prisma.product.update({
            where: { id: parseInt(id) },
            data: await req.json()
        })
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const user = await AuthenticateUser();
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = params.id;
    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        await prisma.product.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}