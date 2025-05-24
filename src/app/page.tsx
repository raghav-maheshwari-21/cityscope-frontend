"use client";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-cursive">Cityscope</Link>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-brand">Login</Link>
            <Link href="/register" className="text-gray-700 hover:text-brand">Register</Link>
          </div>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold">Welcome to Cityscope</h1>
        <p className="mt-4 text-lg">Your local community, online.</p>
        {/* <a href="/feed" className="mt-6 px-6 py-3 bg-brand text-black rounded-full">Explore Feed</a> */}
        <h1 className="text-xl font-bold mt-4">Please <Link className="text-blue-500 hover:underline" href="/login">Login</Link> or <Link className="text-blue-500 hover:underline" href="/register">Register</Link> to explore feeds</h1>
      </section>
    </div>
  );
}
