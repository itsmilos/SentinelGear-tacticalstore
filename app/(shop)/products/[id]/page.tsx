import ProductDetails from "@/app/components/ProductDetails";
import { prisma } from "@/lib/prisma";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

type RouteParams = {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: RouteParams) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <ProductDetails product={product} />
    )


}