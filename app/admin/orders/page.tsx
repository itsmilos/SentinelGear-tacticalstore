"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Order {
    id: number;
    customerName: string;
    customerEmail: string;
    total: number;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    PENDING: "text-amber-400",
    PAID: "text-blue-400",
    SHIPPED: "text-purple-400",
    DELIVERED: "text-green-400",
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch('/api/admin/orders');
            if (!res.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await res.json();
            setOrders(data.orders);
            setLoading(false);
        }
        fetchOrders();
    }, [])

    async function handleStatusChange(orderId: number, newStatus: string) {
        const res = await fetch(`/api/admin/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }
    }

    return (
        <div className="min-h-screen text-white px-6 md:px-10 pt-16 pb-20 max-w-6xl mx-auto">

            <div className="flex items-baseline justify-between border-b border-[#353535] pb-6">
                <div>
                    <div className="pt-8">
                        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition tracking-widest">
                            <ArrowLeft size={18} />
                            COMMAND CENTER
                        </Link>
                    </div>
                    <h1 className="font-display text-5xl md:text-6xl mt-2">Orders</h1>
                </div>
                <p className="text-[10px] tracking-widest text-gray-500 uppercase">
                    {orders.length} Total
                </p>
            </div>

            {loading ? (
                <p className="text-center font-display text-3xl mt-20">Loading...</p>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-500 mt-20 tracking-widest uppercase text-sm">No orders yet</p>
            ) : (
                <div className="mt-10 border-t border-l border-[#353535]">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="grid grid-cols-2 md:grid-cols-5 gap-4 border-r border-b border-[#353535] p-5 items-center"
                        >
                            <div>
                                <p className="text-[10px] tracking-widest text-gray-500 uppercase">Order</p>
                                <p className="font-display text-xl mt-1">#{order.id}</p>
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <p className="text-[10px] tracking-widest text-gray-500 uppercase">Customer</p>
                                <p className="text-sm mt-1">{order.customerName}</p>
                                <p className="text-xs text-gray-500">{order.customerEmail}</p>
                            </div>

                            <div>
                                <p className="text-[10px] tracking-widest text-gray-500 uppercase">Total</p>
                                <p className="font-display text-xl mt-1">${order.total.toFixed(2)}</p>
                            </div>

                            <div>
                                <p className="text-[10px] tracking-widest text-gray-500 uppercase">Date</p>
                                <p className="text-sm mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div>
                                <p className="text-[10px] tracking-widest text-gray-500 uppercase">Status</p>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className={`bg-[#181818] border border-[#353535] mt-1 p-2 text-sm font-bold ${statusColors[order.status] || 'text-white'}`}
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="PAID">PAID</option>
                                    <option value="SHIPPED">SHIPPED</option>
                                    <option value="DELIVERED">DELIVERED</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}