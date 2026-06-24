"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Success() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId")

    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!orderId) return

        async function fetchOrder() {
            try {
                const res = await fetch(`/api/orders/${orderId}`)
                const data = await res.json()
                setOrder(data)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [orderId])

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-10 text-white animate-pulse">
                <p className="text-gray-400">Loading order...</p>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 text-white">

            <div className="mb-10 pt-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                >
                    <ArrowLeft size={18} />
                    BACK TO SHOP
                </Link>
            </div>

            <h1 className="text-5xl lg:text-7xl mb-10 font-display">
                Order Confirmed
            </h1>

            <div className="bg-[#181818] border border-[#353535] p-5 rounded mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Order ID
                </p>
                <h2 className="text-2xl font-bold mt-2">
                    #{order?.order.id}
                </h2>
            </div>

            <div className="bg-[#181818] border border-[#353535] p-5 rounded mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Status
                </p>

                <span className="inline-block mt-2 px-4 py-2 bg-amber-500 text-amber-900 font-bold rounded">
                    {order?.order.status}
                </span>
            </div>

            <div className="mt-10">
                <h1 className="text-xl font-bold">
                    We’ve received your order and are preparing it.
                </h1>

                <p className="text-gray-400 mt-2">
                    You will receive an email confirmation shortly.
                </p>
            </div>

            <div className="mt-8 text-sm text-gray-400">
                Estimated dispatch: <span className="text-white">1–2 business days</span>
            </div>
        </div>
    )
}