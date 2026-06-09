import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export async function AuthenticateUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return null;
    }
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        const user = await prisma.user.findUnique({ where: { id: payload.userId as number }, select: { id: true, email: true, role: true } });
        return user;
    } catch (error) {
        return null;
    }
}