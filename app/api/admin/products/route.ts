import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthenticateUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const user = await AuthenticateUser();
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name, description, price, stock, categoryId, image } = await req.json();
    if (!name || !description || !price || !stock || !categoryId) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                categoryId: parseInt(categoryId),
                image
            }
        });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}