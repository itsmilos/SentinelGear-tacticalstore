"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const labelClass = "text-xs text-gray-500 tracking-widest";
const inputClass = "border border-[#353535] bg-[#181818] p-3 w-full text-sm";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (email.length < 5) {
            setError("Email must be valid");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Registration failed');
                setLoading(false);
                return;
            }

            router.push("/auth/login");
        } catch (err) {
            setError("An error occurred");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center text-white px-6">
            <div className="w-full max-w-sm">
                <div className="border-b border-[#353535] pb-6 mb-10">
                    <p className="text-xs tracking-widest text-gray-500 uppercase">New Account</p>
                    <h1 className="font-display text-5xl mt-2">Register</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {error && (
                        <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/10 p-3">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className={labelClass}>EMAIL *</label>
                        <input
                            type="email"
                            id="email"
                            className={inputClass}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className={labelClass}>PASSWORD *</label>
                        <input
                            type="password"
                            id="password"
                            className={inputClass}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className={labelClass}>CONFIRM PASSWORD *</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={inputClass}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="font-display text-2xl mt-10 w-full bg-green-300 text-black py-4 flex items-center justify-center gap-2 hover:bg-green-200 transition font-medium"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-white hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}