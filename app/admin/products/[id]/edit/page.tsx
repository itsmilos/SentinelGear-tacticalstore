"use client"

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { ArrowLeft } from "lucide-react";

const labelClass = "text-xs text-gray-500 tracking-widest";
const inputClass = "border border-[#353535] bg-[#181818] p-3 w-full text-sm"

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: 0,
        image: ""
    });
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch product');
            }
            const data = await res.json();
            setForm({
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                categoryId: data.categoryId,
                image: data.image || ""
            });
            setLoading(false);
        }
        fetchProduct();
    }, [id])

    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data.categories || data);
        }
        fetchCategories();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        let imageUrl = form.image;

        if (imageFile) {
            setUploading(true);
            const fileName = `${Date.now()}-${imageFile.name}`;

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(fileName, imageFile);

            if (uploadError) {
                console.error(uploadError);
                setUploading(false);
                return;
            }

            const { data } = supabase.storage
                .from('products')
                .getPublicUrl(fileName);

            imageUrl = data.publicUrl;
            setUploading(false);
        }

        const res = await fetch(`/api/admin/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...form, image: imageUrl }),
        })

        if (!res.ok) {
            throw new Error('Failed to update data');
        }

        router.push('/admin/products');
        router.refresh();
    }

    return (
        <div className="min-h-screen text-white px-6 md:px-10 pt-16 pb-20 max-w-2xl mx-auto">

            <div className="border-b border-[#353535] pb-6">
                <div className="pt-8">
                    <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition tracking-widest">
                        <ArrowLeft size={18} />
                        BACK TO INVENTORY
                    </Link>
                </div>
                <h1 className="font-display text-5xl md:text-6xl mt-2">Edit Product</h1>
            </div>

            {loading ? (
                <p className="text-center font-display text-3xl mt-20">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className={labelClass}>PRODUCT NAME *</label>
                            <input id="name" name="name" className={inputClass} required value={form.name} onChange={handleChange} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="description" className={labelClass}>DESCRIPTION *</label>
                            <input id="description" name="description" className={inputClass} required value={form.description} onChange={handleChange} />
                        </div>

                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="price" className={labelClass}>PRICE *</label>
                                <input id="price" name="price" type="number" step="0.01" className={inputClass} required value={form.price} onChange={handleChange} />
                            </div>

                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="stock" className={labelClass}>STOCK *</label>
                                <input id="stock" name="stock" type="number" className={inputClass} required value={form.stock} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="categoryId" className={labelClass}>CATEGORY *</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={form.categoryId}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {form.image && (
                            <div className="flex flex-col gap-1">
                                <label className={labelClass}>CURRENT IMAGE</label>
                                <img src={form.image} alt={form.name} className="w-32 h-32 object-cover border border-[#353535]" />
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="image" className={labelClass}>REPLACE IMAGE</label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={`${inputClass} file:mr-4 file:py-1 file:px-3 file:border file:border-[#353535] file:bg-transparent file:text-white file:text-xs`}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="font-display text-2xl mt-10 w-full bg-green-300 text-black py-4 flex items-center justify-center gap-2 hover:bg-green-200 transition font-medium"
                    >
                        {uploading ? 'Uploading...' : 'Save Changes'}
                    </button>
                </form>
            )}
        </div>
    )
}