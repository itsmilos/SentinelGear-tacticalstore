interface Props {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function Card({ name, description, price, }: Props) {
    return (
        <div className="bg-neutral-primary-soft rounded-base shadow-xs overflow-hidden transition hover:shadow-md rounded-2xl">
            <div className="h-48 bg-gray-500" />
            <div className="p-6 flex flex-col h-full">
                <h5 className="mt-4 text-xl font-semibold text-heading">
                    {name}
                </h5>

                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">
                        ${price}
                    </span>

                    <button className="px-4 py-2 bg-green-900 text-green-300 hover:bg-green-700 rounded drop-shadow-2xl drop-shadow-green-900/50 transition">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}