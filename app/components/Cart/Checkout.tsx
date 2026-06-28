"use client"

import { useAppSelector } from "@/store/hooks"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const labelClass = "text-xs text-gray-500 tracking-widest";
const inputClass = "border border-[#353535] bg-[#181818] p-3 w-full text-sm"

export default function Checkout() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        street: "",
        city: "",
        postalCode: ""
    })

    const [error, setError] = useState("");
    const [shippingPrice, setShippingPrice] = useState(0);

    useEffect(() => {
        if (!form.country) return;

        async function fetchShipping() {
            const res = await fetch(`/api/shipping?country=${form.country}`);
            const data = await res.json();

            setShippingPrice(data.shipping);
        }

        fetchShipping();
    }, [form.country]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const items = useAppSelector(state => state.cart.items);
    const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        if (items.length === 0) {
            router.push("/");
        }
    }, [items]);

    async function handleCheckout(e: any) {
        e.preventDefault();

        const payload = {
            items,
            customer: {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone
            },
            address: {
                country: form.country,
                street: form.street,
                city: form.city,
                postalCode: form.postalCode
            }
        };

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            setError("Failed to create order");
            return;
        }

        const data = await res.json();

        router.push(`/checkout/payment?orderId=${data.orderId}`);
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 text-white">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1 max-w-3xl">
                    <div className="mb-10">
                        <div className="pt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition tracking-widest"
                            >
                                <ArrowLeft size={18} />
                                BACK TO SHOP
                            </Link>
                        </div>
                    </div>

                    <h1 className="text-5xl lg:text-7xl mb-20 font-display">Checkout</h1>

                    <h2 className="text-2xl lg:text-3xl mb-4 font-display">Customer Information</h2>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="firstName" className={labelClass}>FIRST NAME *</label>
                                <input id="firstName" name="firstName" className={inputClass} required onChange={handleChange} value={form.firstName} />
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="lastName" className={labelClass}>LAST NAME *</label>
                                <input id="lastName" name="lastName" className={inputClass} required onChange={handleChange} value={form.lastName} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className={labelClass}>EMAIL *</label>
                            <input id="email" name="email" className={inputClass} required onChange={handleChange} value={form.email} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className={labelClass}>PHONE *</label>
                            <input id="phone" type="number" name="phone" className={inputClass} required onChange={handleChange} value={form.phone} />
                        </div>

                        <h2 className="text-2xl lg:text-3xl mt-6 font-display">Shipping Address</h2>

                        <select className="bg-[#181818] border border-[#353535] w-full p-3" name="country" value={form.country} onChange={handleChange} required>
                            <option value="">Select Country</option>
                            <option value="ba">Bosnia and Herzegovina</option>
                            <option value="hr">Croatia</option>
                            <option value="de">Germany</option>
                            <option value="us">United States</option>
                        </select>

                        {form.country && (
                            <div className="flex flex-col gap-5 mt-2">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="street" className={labelClass}>STREET ADDRESS *</label>
                                    <input id="street" name="street" className={inputClass} onChange={handleChange} value={form.street} />
                                </div>

                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label htmlFor="city" className={labelClass}>CITY *</label>
                                        <input id="city" name="city" className={inputClass} required onChange={handleChange} value={form.city} />
                                    </div>

                                    <div className="flex flex-col gap-1 flex-1">
                                        <label htmlFor="postalCode" className={labelClass}>POSTAL CODE *</label>
                                        <input id="postalCode" name="postalCode" className={inputClass} required onChange={handleChange} value={form.postalCode} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="special" className={labelClass}>ORDER NOTES (OPTIONAL)</label>
                                    <textarea id="special" className="bg-[#181818] border border-[#353535] w-full h-40 p-3 text-sm" placeholder="Special delivery instructions..." />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-70 w-full lg:w-[420px] shrink-0 bg-[#181818] border border-[#353535] p-6 lg:sticky lg:top-6">
                    <h1 className="text-3xl mb-6 font-display">
                        Order Summary
                    </h1>

                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between py-4 border-b border-[#353535]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 relative">
                                    <Image
                                        src={item.image || "/placeholder.webp"}
                                        alt="image"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-display text-lg">
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>

                            <span className="font-display text-2xl">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="mt-6 space-y-3 border-t border-[#353535] pt-6">
                        <div className="flex justify-between">
                            <span className="text-gray-500 uppercase text-xs">Subtotal</span>
                            <span className="font-display text-xl">${subTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500 uppercase text-xs">Shipping</span>
                            <span className="font-display text-xl">${shippingPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between pt-3">
                            <span className="text-gray-500 uppercase">Total</span>
                            <span className="font-display text-3xl">
                                ${(subTotal + shippingPrice).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-4">{error}</p>
                    )}

                    <button
                        className="mt-6 w-full bg-white text-black py-4 flex items-center justify-center gap-2 hover:bg-green-200 transition font-display text-2xl"
                        onClick={handleCheckout}
                    >
                        Continue to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}