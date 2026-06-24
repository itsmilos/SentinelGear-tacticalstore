import getShipping from "@/lib/shipping";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get('country');
    if (!country) {
        return NextResponse.json({ error: 'Country is required' }, { status: 400 });
    }

    const shipping = getShipping(country);

    return NextResponse.json({ shipping }, { status: 200 });
}