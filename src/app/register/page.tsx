"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);
            if (res.data.status === 200) {
                alert("Registration successful");
                router.push("/login");
            }
            else {
                alert("Registration failed");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <>
            <nav className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-cursive">Cityscope</Link>
                    <div className="space-x-4">
                        <Link href="/login" className="text-gray-700 hover:text-brand">Login</Link>
                        <Link href="/register" className="text-gray-700 hover:text-brand">Register</Link>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    {error && <p className="text-red-500 mb-3">{error}</p>}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="w-full p-2 mb-3 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-2 mb-3 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-2 mb-3 border rounded"
                    />
                    <button className="w-full bg-black text-white py-2 rounded">Sign Up</button>
                </form>
                <Link href="/login" className="mt-4 text-blue-500 hover:underline">Already has an account</Link>
            </div>
        </>
    );
}
