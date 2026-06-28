import ProductDetails from "@/app/components/ProductDetails";
import RelatedProducts from "@/app/components/RelatedProducts";
import { prisma } from "@/lib/prisma";

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
        <>
            <ProductDetails product={product} />
            <RelatedProducts categoryId={product.categoryId} excludeId={product.id} />
        </>
    )
}