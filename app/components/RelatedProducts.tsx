import { prisma } from "@/lib/prisma";
import Card from "./Card";

interface Props {
    categoryId: number;
    excludeId: number;
}

export default async function RelatedProducts({ categoryId, excludeId }: Props) {
    const products = await prisma.product.findMany({
        where: {
            categoryId,
            id: {
                not: Number(excludeId)
            }
        },
        take: 5
    });

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 md:px-10 mt-20 text-white">
            <h2 className="font-display text-3xl">YOU MIGHT ALSO LIKE</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                    <Card key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} image={product.image} />
                ))}
            </div>
        </div>
    );
}