"use client"

import { useState, useEffect } from "react"
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminDashboard() {
    const [orders, setOrders] = useState<number>(0);
    const [revenue, setRevenue] = useState<number>(0);
    const [products, setProducts] = useState<number>(0);
    const [pendingOrders, setPendingOrders] = useState<number>(0);

    useEffect(() => {
        async function fetchStats() {
            const res = await fetch('/api/admin/stats');
            const data = await res.json();
            setOrders(data.totalOrders);
            setRevenue(data.totalRevenue);
            setProducts(data.totalProducts);
            setPendingOrders(data.pendingOrders);
        }
        fetchStats();
    }, [])

    return (
        <div className="min-h-screen text-white px-6 md:px-10 pt-16 pb-20 max-w-6xl mx-auto">

            <div className="flex items-baseline justify-between border-b border-[#353535] pb-6">
                <div>
                    <p className="text-gray-500 uppercase text-sm tracking-widest">Command Center</p>
                    <h1 className="font-display text-5xl md:text-6xl mt-2">Dashboard</h1>
                </div>
                <div className="pb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition tracking-widest">
                        <ArrowLeft size={18} />
                        BACK TO HOMEPAGE
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 mt-10 border-t border-l border-[#353535]">
                {[
                    { label: "Total Orders", value: orders },
                    { label: "Revenue", value: `$${(revenue ?? 0).toFixed(2)}` },
                    { label: "Products", value: products },
                    { label: "Pending", value: pendingOrders, alert: pendingOrders > 0 },
                ].map((stat) => (
                    <div key={stat.label} className="border-r border-b border-[#353535] p-6">
                        <p className="text-sm tracking-widest text-gray-500 uppercase">{stat.label}</p>
                        <p className={`font-display text-4xl mt-3 ${stat.alert ? 'text-amber-400' : 'text-white'}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                <Link href="/admin/products" className="group relative overflow-hidden border border-[#353535] p-8 hover:border-white transition flex items-center justify-between">
                    <div>
                        <p className="text-sm tracking-widest text-gray-500 uppercase">Inventory</p>
                        <h2 className="font-display text-3xl mt-2">Manage Products</h2>
                    </div>
                    <span className="text-2xl group-hover:translate-x-1 transition">→</span>
                </Link>

                <Link href="/admin/orders" className="group relative overflow-hidden border border-[#353535] p-8 hover:border-white transition flex items-center justify-between">
                    <div>
                        <p className="text-sm tracking-widest text-gray-500 uppercase">Fulfillment</p>
                        <h2 className="font-display text-3xl mt-2">Manage Orders</h2>
                    </div>
                    <span className="text-2xl group-hover:translate-x-1 transition">→</span>
                </Link>
            </div>
        </div>
    );
}