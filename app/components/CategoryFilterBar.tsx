import Link from "next/link";
import { useSearchParams } from "next/navigation";

const selectedClass = 'bg-white text-black text-sm p-3 rounded flex justify-center items-center';
const nonSelectedClass = 'text-white text-sm p-3 flex justify-center items-center border border-[#353535]';

export default function CategoryFilterBar() {
    const searchParams = useSearchParams();

    const updateFilter = (category: string | null) => {
        const currentParams = new URLSearchParams(searchParams);
        if (!category) {
            currentParams.delete('category');
        } else {
            currentParams.set('category', category ?? "");
        }

        return currentParams.toString();
    }

    const isActive = (category: string | null) => {
        const selected = searchParams.get('category') === category;
        return selected;
    }

    return (
        <div className="flex gap-3">
            <Link className={isActive(null) ? selectedClass : nonSelectedClass} href={`/?${updateFilter(null)}`}>All</Link>
            <Link className={isActive('airsoft') ? selectedClass : nonSelectedClass} href={`/?${updateFilter('airsoft')}`}>Airsoft Replicas</Link>
            <Link className={isActive('equipment') ? selectedClass : nonSelectedClass} href={`/?${updateFilter('equipment')}`}>Tactical Equipment</Link>
        </div>
    )
}