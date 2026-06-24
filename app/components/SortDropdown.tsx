"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const sortOptions = [
    { value: "", label: "No sorting" },
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price Low to High" },
    { value: "price_desc", label: "Price High to Low" },
]

export default function SortDropdown() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentSort = searchParams.get('sort') || "";
    const currentLabel = sortOptions.find((opt) => opt.value === currentSort)?.label ?? "Sort";

    const onSelect = (sort: string) => {
        const currentParams = new URLSearchParams(searchParams);
        if (!sort) {
            currentParams.delete('sort');
        } else {
            currentParams.set('sort', sort);
        }

        router.push(`/?${currentParams.toString()}`);
        setIsOpen(false);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative inline-block text-sm">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 border border-[#353535] p-3 text-white backdrop-blur bg-black/40 hover:bg-black/60 transition"
            >
                {currentLabel}
                <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="left-0 sm:left-auto sm:right-0 absolute right-0 mt-2 w-48 border border-[#353535] backdrop-blur bg-black/40 z-50">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt.value || "default"}
                            type="button"
                            onClick={() => onSelect(opt.value)}
                            className={`w-full text-left px-4 py-2 hover:bg-white/10 transition ${opt.value === currentSort ? "text-white bg-white/10" : "text-gray-300"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
