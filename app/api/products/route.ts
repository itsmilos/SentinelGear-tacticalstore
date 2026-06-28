import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const categoryQuery = searchParams.get('category');
    const sortQuery = searchParams.get('sort');
    const excludeQuery = searchParams.get('exclude');
    const limitQuery = searchParams.get('limit');

    const where: any = {};

    if (categoryQuery) {
        let categoryIds: number[] | undefined = undefined;

        const item = await prisma.category.findFirst({
            where: { name: { equals: categoryQuery, mode: 'insensitive' } },
            include: { children: true }
        })

        const ids = item?.children.map((child) => child.id);
        if (item && ids) {
            categoryIds = [item.id, ...ids];
        }

        where.categoryId = {
            in: categoryIds
        }
    }

    if (excludeQuery) {
        where.id = {
            not: Number(excludeQuery)
        }
    }

    let orderBy: any = undefined;

    if (sortQuery === 'price_asc') {
        orderBy = { price: 'asc' };
    }

    if (sortQuery === 'price_desc') {
        orderBy = { price: 'desc' };
    }

    if (sortQuery === 'newest') {
        orderBy = { id: 'desc' }
    }

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy,
            take: limitQuery ? Number(limitQuery) : undefined
        })

        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}